/**
 * Registers the methods of the module **math** in microTasks.
 * @module math
 */
const _ = require('lodash'),
  microTasks = require('../src'),

  operate = (numbers, operator) => {
    return _.reduce(_.drop(numbers), (total, num) => {
      total = operator(total, num)
      return total
    }, _.first(numbers))
  }

/**
 * @function
 * @returns {number} Returns the sum of several numbers.
 * @name 'math.add'
 * @param {number} [Numbers] List of numbers.
 * @example
 * microTasks.taskRun([{
 *   method: 'math.add',
 *   params: [1, 2, 3],
 *   resultPath: 'total'
 * }])
 * // payload.total = 6
 */
microTasks.methodRegister('math.add', (...numbers) => operate(numbers, (total, num) => total + num))

/**
 * @function
 * @returns {number} Returns the division of several numbers.
 * @name 'math.divide'
 * @param {number} [Numbers] List of numbers.
 * @example
 * microTasks.taskRun([{
 *   method: 'math.divide',
 *   params: [24, 3, 2],
 *   resultPath: 'total'
 * }])
 * // payload.total = 4
 */
microTasks.methodRegister('math.divide', (...numbers) => operate(numbers, (total, num) => total / num))

/**
* @function
* @returns {number} Returns the multiplication of several numbers.
* @name 'math.multiply'
* @param {number} [Numbers] List of numbers.
* @example
* microTasks.taskRun([{
*   method: 'math.multiply',
*   params: [2, 3, 4],
*   resultPath: 'total'
* }])
* // payload.total = 24
*/
microTasks.methodRegister('math.multiply', (...numbers) => operate(numbers, (total, num) => total * num))

/**
 * @function
 * @returns {number} Returns the result of a mathematical operation, using the native library Math.
 * @param {operation} operation Numbers.
 * @param {args} [args] Arguments of the operation.
 * @name 'math.operate'
 * @example
 * microTasks.taskRun([{
 *   method: 'math.operate',
 *   params: [round, 1.1], // Math.round(1.1)
 *   resultPath: 'total'
 * }])
 * // payload.total = 1
 */
microTasks.methodRegister('math.operate', (operation, ...numbers) => Math[operation](...numbers))

/**
 * @function
 * @returns {number} Returns the number parsed to number.
 * @param {number} number Number.
 * @name 'math.parseInt'
 * @example
 * microTasks.taskRun([{
 *   method: 'math.parseInt',
 *   params: 1.1,
 *   resultPath: 'total'
 * }])
 * // payload.total = 1
 */
microTasks.methodRegister('math.parseInt', (number) => parseInt(number))

/**
 * @function
 * @returns {number} Returns the subtraction of several numbers.
 * @name 'math.substract'
 * @param {number} [Numbers] List of numbers.
 * @example
 * microTasks.taskRun([{
 *   method: 'math.substract',
 *   params: [10, 3, 1],
 *   resultPath: 'total'
 * }])
 * // payload.total = 6
 */
microTasks.methodRegister('math.substract', (...numbers) => operate(numbers, (total, num) => total - num))
