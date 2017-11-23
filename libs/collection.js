/**
 * Registers the methods of the module **collection** in microTasks.
 *
 * ToDo: Documentation
 * @module collection
 */
const _ = require('lodash'),
  microTasks = require('../src')

/**
 * @function
 * @name 'collection.filterByIterator'
 */
microTasks.methodRegister('collection.filterByIterator', (items, mapper, ...args) => {
  return _.filter(items, (item) => {
    const itemProps = _.map(args, (arg) => item[arg])
    return microTasks.methodRun(mapper, ...itemProps)
  })
})

/**
 * @function
 * @name 'collection.filterByProps'
 */
microTasks.methodRegister('collection.filterByProps', _.filter)

/**
 * @function
 * @name 'collection.mapByIterator'
 */
microTasks.methodRegister('collection.mapByIterator', (items, mapper, to, ...args) => {
  return _.map(items, (item) => {
    const itemProps = _.map(args, (arg) => item[arg])
    item[to] = microTasks.methodRun(mapper, ...itemProps)
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
 * @name 'collection.order'
 */
microTasks.methodRegister('collection.order', _.orderBy)
