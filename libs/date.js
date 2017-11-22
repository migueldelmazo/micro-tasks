/**
 * Registers the actions, contexts, hooks and methods of the module **date** in microTasks.
 * @module date
 */
const microTasks = require('../src')

/**
 * @function
 * @returns {boolean} Returns if value is later than now.
 * @name 'date.isLaterThanNow'
 * @param {date} date date to validate
 * @example
 * microTasks.taskRun([{
 *   method: 'date.isLaterThanNow',
 *   params: 1511284457000,
 *   resultPath: 'isLater'
 * }])
 * // payload.isLater = false
 */
microTasks.methodRegister('date.isLaterThanNow', (value) => value > Date.now())

/**
 * @function
 * @returns {boolean} Returns if value is before now.
 * @name 'date.isBeforeThanNow'
 * @param {date} date date to validate
 * @example
 * microTasks.taskRun([{
 *   method: 'date.isBeforeThanNow',
 *   params: 1511284457000,
 *   resultPath: 'isBefore',
 * }])
 * // payload.isBefore = true
 */
microTasks.methodRegister('date.isBeforeThanNow', (value) => value < Date.now())

/**
 * Parse a Date object to timestamp.
 * @function
 * @name 'date.toTimestamp'
 * @param {date} date date to parse
 * @example
 * microTasks.taskRun([{
 *   method: 'date.toTimestamp',
 *   params: 'Tue Nov 21 2017 18:14:17 GMT+0100 (CET)',
 *   resultPath: 'timestamp'
 * }])
 * // payload.timestamp = 1511284457000
 */
microTasks.methodRegister('date.toTimestamp', (date) => {
  return new Date(date).getTime()
})
