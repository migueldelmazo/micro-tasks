/**
 * Registers the actions, contexts, hooks and methods of the module **logger** in [microTasks]{@link module:microTasks}.
 * @module logger
 */
const microTasks = require('../src')

/**
 * Prints in console an error
 * @function
 * @name 'logger.error'
 * @param {*} [arguments] Arguments to log
 * @example
 * microTasks.methodRun('logger.error', 'this is', 'an error')
 */
microTasks.methodRegister('logger.error', (...args) => {
  console.error('error', ...args)
})

/**
 * Prints in console a log
 * @function
 * @name 'logger.log'
 * @param {*} [arguments] Arguments to log
 * @example
 * microTasks.methodRun('logger.log', 'this is', 'an log')
 */
microTasks.methodRegister('logger.log', (...args) => {
  console.log('log', ...args)
})

/**
 * @name hook list registered
 * @param {method} logger.error Executes `logger.error` method
 * @param {method} logger.log Executes `logger.log` method
 */
microTasks.hookRegister('logger.error', 'logger.error')
microTasks.hookRegister('logger.log', 'logger.log')
