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
 * @returns {boolean} Returns process memory usage.
 * @name 'process.getMemoryUsage'
 * @param {unity} unity=b Unity of values: `b`, `kb`, `mb` or `tb`
 * @example
 * microTasks.taskRun([{ method: 'validate.isArray', params: 'mg', resultPath: 'memory' }])
 * // payload.memory = { heapUsed: 60, heapTotal: 90, rss: 236 }
 */
microTasks.methodRegister('process.getMemoryUsage', (unity = 'b') => {
  let factor
  switch (unity.toLowerCase()) {
    case 'tb':
      factor = 1024 * 1024 * 1024
      break
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
    acc[key] = Math.round(value / factor)
    return acc
  }, {})
})
