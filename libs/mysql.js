/**
 * Registers the actions, contexts, hooks and methods of the module **mySQL** in microTasks.
 * @module mysql
 */
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
      database: _.get(data, 'database') || microTasks.contextGet('mysql.connection.database'),
      debug: _.get(data, 'debug') || microTasks.contextGet('mysql.connection.debug'),
      host: _.get(data, 'host') || microTasks.contextGet('mysql.connection.host'),
      password: _.get(data, 'password') || microTasks.contextGet('mysql.connection.password'),
      port: _.get(data, 'port') || microTasks.contextGet('mysql.connection.port'),
      user: _.get(data, 'user') || microTasks.contextGet('mysql.connection.user')
    }
  },

  parseDataQuery = (data) => {
    return data
  },

  parseDataHandler = (data) => {
    switch (data) {
      case 'field':
        return handlerField
      case 'row':
        return handlerRow
      case 'rows':
        return handlerRows
      default:
        return handlerRows
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

/**
 * @name actions registered
 * @param {method} mysql.query Executes `mysql.query` method
 */
microTasks.actionRegister({
  name: 'mysql.query',
  method: 'mysql.query'
})

/**
 * @name context items registered
 * @param {string} mysql.connection.database Connection data base name
 * @param {boolean} mysql.connection.debug=false Connection debug mode
 * @param {string} mysql.connection.host Connection host
 * @param {string} mysql.connection.password Connection password
 * @param {number} mysql.connection.port=3306 Connection port
 * @param {string} mysql.connection.user Connection user
 */
microTasks.contextSet('mysql.connection.database', '')
microTasks.contextSet('mysql.connection.debug', false)
microTasks.contextSet('mysql.connection.host', '')
microTasks.contextSet('mysql.connection.password', '')
microTasks.contextSet('mysql.connection.port', 3306)
microTasks.contextSet('mysql.connection.user', '')

/**
 * Executes a mysql query and returns the response.
 * @function
 * @name 'mysql.query'
 * @param {object} data={} query configuration
 * @param {string} data.query mySQL query
 * @param {object} [data.connection={}] Connection configuration. This object extends from `context.mysql.connection`
 * @param {string} [data.handler=rows] Response handler, it can be `field` (value), `row` (object) or `rows` (array of objects)
 * @example
 * microTasks.actionRegister({
 *   method: 'mysql.query',
 *   params: {
 *     connection: {
 *       host: '127.0.0.1',
 *       user: 'db_user',
 *       password: 'db_pass'
 *     },
 *     query: 'SELECT email FROM db_name.users WHERE id=123 LIMIT 1',
 *     handler: 'field' // returns user email as a value
 *   }
 * })
 */
microTasks.methodRegister('mysql.query', (data) => {
  return new Promise((resolve, reject) => {
    data = parseData(data)
    const connection = mysql.createConnection(data.connection)
    connection.connect()
    connection.query(data.query, (err, results, fields) => {
      if (err) {
        reject(parseError(err))
      } else {
        data.handler(results, fields, resolve)
      }
      connection.end()
    })
  })
})
