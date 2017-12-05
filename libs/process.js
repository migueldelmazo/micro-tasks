/**
 * Registers the methods of the module **process** in microTasks.
 *
 * ToDo: Documentation
 * @module process
 */
const _ = require('lodash'),
  microTasks = require('../src')

/**
 * @function
 * @name 'process.getMemoryUsage'
 */
microTasks.methodRegister('process.getMemoryUsage', (unit = 'b') => {
  let factor
  switch (unit) {
    case 'mb':
      factor = 1024 * 1024
      break
    case 'kb':
      factor = 1024
      break
    default:
      factor = 1
      break
  }
  return _.reduce(process.memoryUsage(), (acc, value, key) => {
    acc[key] = value / factor
    return acc
  }, {})
})
