/**
 * Registers the methods of the module **mongodb** in microTasks.
 *
 * ToDo: Documentation
 * @module mongodb
 */
const _ = require('lodash'),
  client = require('mongodb').MongoClient,
  microTasks = require('../src'),

  connect = (data) => {
    data.connectionUrl = _.get(data, 'connectionUrl') || microTasks.contextGet('mongodb.connection.url', '')
    return client.connect(data.connectionUrl)
      .then((db) => { data.db = db })
  },

  disconnect = (data) => {
    data.db.close()
  },

  getCollection = (data) => {
    const collectionName = _.get(data, 'collectionName', '')
    data.collection = data.db.collection(collectionName)
  },

  parseDataItem = (data, key, defaultValue) => {
    data[key] = data[key] || defaultValue
  }

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
    .then(() => disconnect(data))
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
    .then(() => disconnect(data))
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
    .then(() => disconnect(data))
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
    .then(() => disconnect(data))
})
