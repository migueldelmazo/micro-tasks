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
    .then((docs) => { data.docs = docs })
    .then(() => data.docs)
})

/**
* @function
* @name 'mongodb.findAndInsertOne'
*/
microTasks.methodRegister('mongodb.findAndInsertOne', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'filter', {}))
    .then(() => parseDataItem(data, 'doc', {}))
    .then(() => data.collection.find(data.filter).toArray())
    .then((foundDocs) => {
      if (_.size(foundDocs) === 0) {
        return data.collection.insertOne(data.doc)
      }
    })
    .then((result) => _.get(result, 'result.n'))
})

/**
* @function
* @name 'mongodb.insertOne'
*/
microTasks.methodRegister('mongodb.insertOne', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'doc', {}))
    .then(() => data.collection.insertOne(data.doc))
    .then((result) => _.get(result, 'result.n'))
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
    .then(() => data.collection.updateOne(data.filter, data.update))
    .then((result) => _.get(result, 'result.n'))
})

/**
* @function
* @name 'mongodb.remove'
*/
microTasks.methodRegister('mongodb.remove', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'filter', {}))
    .then(() => data.collection.remove(data.filter))
    .then((result) => _.get(result, 'result.n'))
})
