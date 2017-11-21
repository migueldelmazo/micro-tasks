const _ = require('lodash'),
  microTasks = require('../src')

microTasks.methodRegister('collection.filterByIterator', (items, mapper, ...args) => {
  return _.filter(items, (item) => {
    const itemProps = _.map(args, (arg) => item[arg])
    return microTasks.methodRun(mapper, ...itemProps)
  })
})

microTasks.methodRegister('collection.filterByProps', _.filter)

microTasks.methodRegister('collection.mapByIterator', (items, mapper, to, ...args) => {
  return _.map(items, (item) => {
    const itemProps = _.map(args, (arg) => item[arg])
    item[to] = microTasks.methodRun(mapper, ...itemProps)
    return item
  })
})

microTasks.methodRegister('collection.mapByProps', (items, keys) => {
  return _.map(items, (item) => _.pick(item, keys))
})

microTasks.methodRegister('collection.order', _.orderBy)
