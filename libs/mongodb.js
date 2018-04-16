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
    _.set(data, key, _.get(data, key, defaultValue))
  }

let connectedDb

/**
* @function
* @name 'mongodb.close'
*/
microTasks.methodRegister('mongodb.close', (data) => {
  if (connectedDb) {
    return connectedDb.close()
  }
})

/**
* @function
* @name 'mongodb.count'
*/
microTasks.methodRegister('mongodb.count', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'query', {}))
    .then(() => data.collection.find(data.query).count())
})

/**
 * @function
 * @name 'mongodb.find'
 */
microTasks.methodRegister('mongodb.find', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'projection', {}))
    .then(() => parseDataItem(data, 'query', {}))
    .then(() => parseDataItem(data, 'sort', {}))
    .then(() => parseDataItem(data, 'limit', Math.pow(2, 31)))
    .then(() => data.collection.find(data.query, data.projection).sort(data.sort).limit(data.limit).toArray())
})

/**
 * @function
 * @name 'mongodb.findOneAndUpdate'
 */
microTasks.methodRegister('mongodb.findOneAndUpdate', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'query', {}))
    .then(() => parseDataItem(data, 'update', {}))
    .then(() => parseDataItem(data, 'options', {}))
    .then(() => data.collection.findOneAndUpdate(data.query, data.update, data.options))
    .then(({ lastErrorObject, value }) => {
      data.upsertedId = _.get(lastErrorObject, 'upserted')
      data.updatedId = _.get(value, '_id')
      data.updatedDocument = value
      data.result = { matched: 0, updated: 0, upserted: 0 }
    })
    .then(() => {
      if (data.upsertedId) {
        data.result.upserted = 1
        return data.collection.findOneAndUpdate({ _id: data.upsertedId }, { $currentDate: { updatedAt: true } })
      }
    })
    .then(() => {
      if (data.updatedId) {
        data.result.matched = 1
        return data.collection.findOne({ _id: data.updatedId })
      }
    })
    .then((result) => {
      if (result && !_.isEqual(data.updatedDocument, result)) {
        data.result.updated = 1
        return data.collection.findOneAndUpdate({ _id: data.updatedId }, { $currentDate: { updatedAt: true } })
      }
    })
    .then(() => {
      return data.result
    })
})

/**
 * @function
 * @name 'mongodb.findOne'
 */
microTasks.methodRegister('mongodb.findOne', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'query', {}))
    .then(() => data.collection.findOne(data.query))
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
* @name 'mongodb.remove'
*/
microTasks.methodRegister('mongodb.remove', (data) => {
  return connect(data)
    .then(() => getCollection(data))
    .then(() => parseDataItem(data, 'query', {}))
    .then(() => parseDataItem(data, 'options', {}))
    .then(() => data.collection.remove(data.query, data.options))
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
    .then((result) => microTasks.methodRun('mongodb.parseWriteResult', result))
})
