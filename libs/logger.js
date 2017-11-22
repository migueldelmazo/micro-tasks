/**
 * Registers the hooks and methods of the module **logger** in microTasks.
 * @module logger
 */
const microTasks = require('../src')

/**
 * Prints in console an error.
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
 * Prints in console a log.
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
 * Prints in console a warning.
 * @function
 * @name 'logger.warn'
 * @param {*} [arguments] Arguments to log
 * @example
 * microTasks.methodRun('logger.warn', 'this is', 'a warning')
 */
microTasks.methodRegister('logger.warn', (...args) => {
  console.warn('log', ...args)
})

/**
 * Hook list registered in microTask.
 * @name hooks
 * @param {method} logger.error Executes `logger.error` method
 * @param {method} logger.log Executes `logger.log` method
 * @param {method} logger.warn Executes `logger.warn` method
 */
microTasks.hookRegister('logger.error', 'logger.error')
microTasks.hookRegister('logger.log', 'logger.log')
microTasks.hookRegister('logger.warn', 'logger.warn')
