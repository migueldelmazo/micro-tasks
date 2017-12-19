/**
 * Registers the methods of the module **mongodb** in microTasks.
 * ToDo: Documentation
 * @module mongodb
 */
const _ = require('lodash'),
  client = require('mongodb').MongoClient,
  microTasks = require('../src'),

  connect = (data) => {
    if (connectedDb) {
      data.db = connectedDb
      return microTasks.resolve()
    } else {
      data.connectionUrl = _.get(data, 'connectionUrl') || microTasks.contextGet('mongodb.connection.url', '')
      return client.connect(data.connectionUrl)
        .then((db) => { connectedDb = db })
        .then(() => { data.db = connectedDb })
    }
  },

  getCollection = (data) => {
    const collectionName = _.get(data, 'collectionName', '')
    data.collection = data.db.collection(collectionName)
  },

  parseDataItem = (data, key, defaultValue) => {
    data[key] = data[key] || defaultValue
  }

let connectedDb

/**
 * @function
 * @name 'mongodb.find'
 */
microTasks.methodRegister('mongodb.find', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'filter', {}))
    .then(() => data.collection.find(data.filter).toArray())
})

/**
 * @function
 * @name 'mongodb.findOne'
 */
microTasks.methodRegister('mongodb.findOne', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'filter', {}))
    .then(() => data.collection.findOne(data.filter))
})

/**
* @function
* @name 'mongodb.parseWriteResult'
*/
microTasks.methodRegister('mongodb.parseWriteResult', (result) => {
  return {
    matched: _.get(result, 'result.n', 0),
    modified: _.get(result, 'result.nModified', 0)
  }
})

/**
* @function
* @name 'mongodb.update'
*/
microTasks.methodRegister('mongodb.update', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'filter', {}))
    .then(() => parseDataItem(data, 'update', {}))
    .then(() => parseDataItem(data, 'options', {}))
    .then(() => data.collection.update(data.filter, data.update, data.options))
    .then((result) => microTasks.methodRun('mongodb.parseWriteResult', result))
})

/**
* @function
* @name 'mongodb.updateOne'
*/
microTasks.methodRegister('mongodb.updateOne', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'filter', {}))
    .then(() => parseDataItem(data, 'update', {}))
    .then(() => parseDataItem(data, 'options', {}))
    .then(() => data.collection.updateOne(data.filter, data.update, data.options))
    .then((result) => microTasks.methodRun('mongodb.handlerResult', result, data))
    .then((result) => microTasks.methodRun('mongodb.parseWriteResult', result))
})
