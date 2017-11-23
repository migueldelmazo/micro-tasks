/**
 * Registers the methods of the module **request** in microTasks.
 * @module request
 */
const _ = require('lodash'),
  http = require('http'),
  https = require('https'),
  microTasks = require('../src'),

  // send: request

  sendParseEndpoint = (endpoint, resolve, reject) => {
    endpoint.method = (endpoint.method || 'GET').toUpperCase()
    endpoint.protocol = endpoint.protocol || 'https'
    endpoint.hostname = endpoint.hostname || ''
    endpoint.port = endpoint.port || ''
    endpoint.path = endpoint.path || '/'
    endpoint.stringBody = _.isEmpty(endpoint.body) ? '' : JSON.stringify(endpoint.body)
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

/**
 * Send a request to a URI.
 * @function
 * @name 'request.send'
 * @param {object} endopoint={} Request configuration
 * @param {object} [endopoint.body={}] Post body data
 * @param {object} [endopoint.headers={}] Headers
 * @param {string} [endopoint.hostname] Hostname: e.g. mail.google.com
 * @param {string} [endopoint.method=GET] Method: GET, POST, PATCH...
 * @param {string} [endopoint.path=/] Path
 * @param {string} [endopoint.protocol=https] Protocol: https or http
 * @param {string} [endopoint.port] Port
 * @example
 * microTasks.taskRun([{
 *   method: 'request.send',
 *   params: {
 *     body: { email: 'info@example.com', password: '12345678' },
 *     hostname: 'app.example.com',
 *     method: 'POST',
 *     path: 'user/login',
 *     protocol: 'https'
 *   }
 * }])
 */
microTasks.methodRegister('request.send', (endpoint) => {
  return new Promise((resolve, reject) => {
    sendParseEndpoint(endpoint, resolve, reject)
    const request = sendGetRequest(endpoint)
    sendListenError(request, endpoint)
    sendWriteBody(request, endpoint)
    request.end()
  })
})
