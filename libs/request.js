const _ = require('lodash'),
  http = require('http'),
  https = require('https'),
  microTasks = require('../src'),

  // send: request

  sendParseEndpoint = (endpoint, resolve, reject) => {
    endpoint.method = (endpoint.method || 'GET').toUpperCase()
    endpoint.protocol = endpoint.protocol || 'http'
    endpoint.hostname = endpoint.hostname || ''
    endpoint.port = endpoint.port || ''
    endpoint.path = endpoint.path || '/'
    endpoint.stringBody = _.isEmpty(endpoint.body) ? '' : _.stringify(endpoint.body)
    endpoint.responseData = ''
    endpoint.resolve = resolve
    endpoint.reject = reject
    endpoint.headers = sendParseEndpointHeaders(endpoint)
  },

  sendParseEndpointHeaders = (endpoint) => {
    let headers = _.omitBy(endpoint.headers, _.isUndefined)
    headers = _.defaults(endpoint.headers, { 'Content-Type': 'application/json' })
    if (['POST', 'PATCH', 'PUT'].indexOf(endpoint.method) >= 0) {
      headers['Content-Length'] = endpoint.stringBody.length
    }
    return headers
  },

  sendGetRequest = (endpoint) => {
    const handler = endpoint.protocol === 'http' ? http : https
    return handler.request({
      headers: endpoint.headers,
      hostname: endpoint.hostname,
      method: endpoint.method,
      path: endpoint.path,
      port: endpoint.port
    }, sendHandleResponse.bind(null, endpoint))
  },

  sendListenError = (request, endpoint) => {
    request.on('error', (err) => endpoint.reject(err))
  },

  sendWriteBody = (request, endpoint) => {
    if (endpoint.stringBody) {
      request.write(endpoint.stringBody)
    }
  },

  // send: response

  sendHandleResponse = (endpoint, response) => {
    endpoint.response = response
    response.setEncoding('utf8')
    response.on('data', sendResponseOnData.bind(null, endpoint))
    response.on('end', sendResponseOnEnd.bind(null, endpoint))
  },

  sendResponseOnData = (endpoint, chunk) => {
    endpoint.responseData += chunk
  },

  sendResponseOnEnd = (endpoint) => {
    try {
      endpoint.resolve({
        data: sendResponseOnEndGetData(endpoint),
        status: endpoint.response.statusCode
      })
    } catch (err) {
      endpoint.reject(err)
    }
  },

  sendResponseOnEndGetData = (endpoint) => {
    switch (endpoint.headers['Content-Type']) {
      case 'application/json':
        return JSON.parse(endpoint.responseData || '{}')
      default:
        return endpoint.responseData
    }
  }

// methods

microTasks.methodRegister('request.send', (endpoint) => {
  return new Promise((resolve, reject) => {
    sendParseEndpoint(endpoint, resolve, reject)
    const request = sendGetRequest(endpoint)
    sendListenError(request, endpoint)
    sendWriteBody(request, endpoint)
    request.end()
  })
})

microTasks.methodRegister('request.getData', function () {
  return {
    body: this.req.body || {},
    params: this.req.params,
    query: this.req.query
  }
})

// tasks

microTasks.taskRegister({
  name: 'request.getData',
  method: 'request.getData'
})

microTasks.taskRegister({
  name: 'request.send',
  method: 'request.send'
})
