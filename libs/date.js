/**
 * Registers the methods of the module **date** in microTasks.
 * @module date
 */
const microTasks = require('../src')

/**
 * @function
 * @returns {boolean} Returns current date.
 * @name 'date.getDate'
 * @example
 * microTasks.taskRun([{
 *   method: 'date.getDate',
 *   resultPath: 'now'
 * }])
 * // payload.now = Tue Dec 19 2017 16:24:44 GMT+0100 (CET)
 */
microTasks.methodRegister('date.getDate', () => new Date())

/**
 * @function
 * @returns {boolean} Returns now date timestamp.
 * @name 'date.getNow'
 * @example
 * microTasks.taskRun([{
 *   method: 'date.getNow',
 *   resultPath: 'now'
 * }])
 * // payload.now = 1511284457000
 */
microTasks.methodRegister('date.getNow', () => Date.now())

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
 * Parse a value to JavaScript Date object.
 * @function
 * @name 'date.toDate'
 * @param {*} date value to parse
 * @example
 * microTasks.taskRun([{
 *   method: 'date.toDate',
 *   params: 'Tue Nov 21 2017 18:14:17 GMT+0100',
 *   resultPath: 'date'
 * }])
 * // payload.date = Tue Nov 21 2017 18:14:17 GMT+0100 (CET)
 */
microTasks.methodRegister('date.toDate', (date) => {
  return new Date(date)
})

/**
 * Returns a midnight of a date.
 * @function
 * @name 'date.toMidnight'
 * @param {*} date date
 * @example
 * microTasks.taskRun([{
 *   method: 'date.toMidnight',
 *   params: 'Tue Nov 21 2017 18:14:17 GMT+0100',
 *   resultPath: 'date'
 * }])
 * // payload.date = 1511222400000
 */
microTasks.methodRegister('date.toMidnight', (date) => {
  return new Date(date).setUTCHours(0, 0, 0, 0)
})

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
