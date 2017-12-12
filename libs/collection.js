/**
 * Registers the methods of the module **collection** in microTasks.
 *
 * ToDo: Documentation
 * @module collection
 */
const _ = require('lodash'),
  microTasks = require('../src'),

  argsParser = (args, item) => _.map(args, (arg) => item[arg])

/**
 * @function
 * @name 'collection.each'
 */
microTasks.methodRegister('collection.each', (items, mapper, ...args) => {
  _.each(items, (item) => {
    return microTasks.methodRun(mapper, ...argsParser(args, item))
  })
})

/**
* @function
* @name 'collection.filterByIterator'
*/
microTasks.methodRegister('collection.filterByIterator', (items, mapper, ...args) => {
  return _.filter(items, (item) => {
    return microTasks.methodRun(mapper, ...argsParser(args, item))
  })
})

/**
 * @function
 * @name 'collection.filterByProps'
 */
microTasks.methodRegister('collection.filterByProps', _.filter)

/**
 * @function
 * @name 'collection.flatten'
 */
microTasks.methodRegister('collection.flatten', (items, keys) => {
  items = _.map(items, (item) => _.values(_.pick(item, keys)))
  return _.flatten(items)
})

/**
 * @function
 * @name 'collection.join'
 */
microTasks.methodRegister('collection.join', (arr, separator = ', ') => {
  return _.join(arr, separator)
})

/**
 * @function
 * @name 'collection.mapByIterator'
 */
microTasks.methodRegister('collection.mapByIterator', (items, mapper, to, ...args) => {
  return _.map(items, (item) => {
    item[to] = microTasks.methodRun(mapper, ...argsParser(args, item))
    return item
  })
})

/**
 * @function
 * @name 'collection.mapByProps'
 */
microTasks.methodRegister('collection.mapByProps', (items, keys) => {
  return _.map(items, (item) => _.pick(item, keys))
})

/**
 * @function
 * @name 'collection.set'
 */
microTasks.methodRegister('collection.mapSet', (items, key, value) => {
  return _.map(items, (item) => {
    item[key] = value
    return item
  })
})

/**
 * @function
 * @name 'collection.order'
 */
microTasks.methodRegister('collection.order', _.orderBy)

/**
 * @function
 * @name 'collection.reduce'
 */
microTasks.methodRegister('collection.reduce', (items, reducer, accumulator, ...args) => {
  return _.reduce(items, (acc, item) => {
    return microTasks.methodRun(reducer, acc, ...argsParser(args, item))
  }, accumulator)
})

/**
 * @function
 * @name 'collection.reduceRight'
 */
microTasks.methodRegister('collection.reduceRight', (items, reducer, accumulator, ...args) => {
  return _.reduceRight(items, (acc, item) => {
    return microTasks.methodRun(reducer, acc, ...argsParser(args, item))
  }, accumulator)
})
