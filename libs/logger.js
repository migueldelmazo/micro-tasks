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
 * @param {method} microTasks.onActionEnd Executes `logger.log` method
 * @param {method} microTasks.onActionError Executes `logger.error` method
 * @param {method} microTasks.onActionRejected Executes `logger.log` method
 * @param {method} microTasks.onGlobalError Executes `logger.error` method
 * @param {method} microTasks.onTaskEnd Executes `logger.log` method
 * @param {method} microTasks.onTaskError Executes `logger.error` method
 * @param {method} microTasks.onTaskRejected Executes `logger.log` method
 * @param {method} microTasks.onTaskStart Executes `logger.log` method
 */
microTasks.hookRegister('logger.error', 'logger.error')
microTasks.hookRegister('logger.log', 'logger.log')
microTasks.hookRegister('logger.warn', 'logger.warn')

microTasks.hookRegister('microTasks.onActionEnd', (...args) => {
  microTasks.methodRun('logger.log', 'onActionEnd', ...args)
})

microTasks.hookRegister('microTasks.onActionError', (...args) => {
  microTasks.methodRun('logger.error', 'onActionError', ...args)
})

microTasks.hookRegister('microTasks.onActionRejected', (...args) => {
  microTasks.methodRun('logger.log', 'onActionRejected', ...args)
})

microTasks.hookRegister('microTasks.onGlobalError', (...args) => {
  microTasks.methodRun('logger.error', 'onGlobalError', ...args)
})

microTasks.hookRegister('microTasks.onTaskEnd', (...args) => {
  microTasks.methodRun('logger.log', 'onTaskEnd', ...args)
})

microTasks.hookRegister('microTasks.onTaskError', (...args) => {
  microTasks.methodRun('logger.error', 'onTaskError', ...args)
})

microTasks.hookRegister('microTasks.onTaskRejected', (...args) => {
  microTasks.methodRun('logger.log', 'onTaskRejected', ...args)
})

microTasks.hookRegister('microTasks.onTaskStart', (...args) => {
  microTasks.methodRun('logger.log', 'onTaskStart', ...args)
})
