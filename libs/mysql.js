const _ = require('lodash'),
  mysql = require('mysql'),
  microTasks = require('../src'),

  // parse data

  parseData = (data) => {
    return {
      connection: parseDataConnection(data.connection),
      handler: parseDataHandler(data.handler),
      query: parseDataQuery(data.query)
    }
  },

  parseDataConnection = (data) => {
    return {
      host: _.get(data, 'host') || microTasks.contextGet('mysql.connection.host'),
      user: _.get(data, 'user') || microTasks.contextGet('mysql.connection.user'),
      password: _.get(data, 'password') || microTasks.contextGet('mysql.connection.password'),
      database: _.get(data, 'database') || microTasks.contextGet('mysql.connection.database')
    }
  },

  parseDataQuery = (data) => {
    return data
  },

  parseDataHandler = (data) => {
    switch (data) {
      case 'field':
        return {
          handler: 'field',
          method: handlerField
        }
      case 'row':
        return {
          handler: 'row',
          method: handlerRow
        }
      case 'rows':
        return {
          handler: 'rows',
          method: handlerRows
        }
      default:
        return {
          handler: 'default',
          method: handlerRows
        }
    }
  },

  // error

  parseError = (err) => {
    return err
  },

  // handlers

  handlerField = (result, fields, resolve) => {
    if (_.size(result) && _.size(fields) && fields[0].name) {
      resolve(result[0][fields[0].name])
    } else {
      resolve(undefined)
    }
  },

  handlerRow = (result, fields, resolve) => {
    if (_.size(result)) {
      resolve(result[0])
    } else {
      resolve({})
    }
  },

  handlerRows = (result, fields, resolve) => {
    resolve(result)
  }

// methods
microTasks.methodRegister('mysql.query', (data) => {
  return new Promise((resolve, reject) => {
    data = parseData(data)
    const connection = mysql.createConnection(data.connection)
    connection.connect()
    connection.query(data.query, (err, results, fields) => {
      if (err) {
        reject(parseError(err))
      } else {
        data.handler.method(results, fields, resolve)
      }
    })
  })
})

// tasks

microTasks.taskRegister({
  name: 'mysql.query',
  method: 'mysql.query'
})
