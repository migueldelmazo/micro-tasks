/**
 * Registers the methods of the module **utils** in microTasks.
 * @module utils
 */
const _ = require('lodash'),
  microTasks = require('../src')

/**
 * Copy a list of values from and to payload.
 * @function
 * @name 'utils.copy'
 * @param {object} definition={} `to: from` object list
 * @example
 * microTasks.taskRun([{
 *   method: 'utils.copy',
 *   params: { 'newUserId': 'user.id', 'newUserAge': 'user.age' }
 * }],
 * {
 *   user: { id: 123, age: 18 } // payload
 * })
 * // payload = { user: { id: 123, age: 18 }, newUserId: 123, newUserAge: 18 }
 */
microTasks.methodRegister('utils.copy', function (definition) {
  _.each(definition, (value, key) => {
    _.set(this, key, _.get(this, value))
  })
})

/**
 * Set defaultValue if value is undefined
 * @function
 * @name 'utils.default'
 * @param {string} key Key to set
 * @param {*} defaultValue Value to set
 * @example
 * microTasks.taskRun([{
 *   method: 'utils.default',
 *   params: ['foo', 123]
 * }])
 */
microTasks.methodRegister('utils.default', function (key, defaultValue) {
  if (_.get(this, key) === undefined) {
    _.set(this, key, defaultValue)
  }
})

/**
 * Returns the processing time of a task
 * @function
 * @name 'utils.getTaskTime'
 * @param {object} payload Payload of the task
 * @example
 * microTasks.methodRun('utils.getTaskTime', payload)
 * // 145 milliseconds
 */
microTasks.methodRegister('utils.getTaskTime', (payload) => {
  const lastAction = _.findLast(payload.__actions, (action) => _.get(action, 'time.end')) || {}
  return _.get(lastAction, 'time.end') - _.get(payload, '__actions[0].time.start')
})

/**
 * Set a value in payload.
 * @function
 * @name 'utils.set'
 * @param {string} to destination path in payload
 * @param {*} from source value in payload
 * @example
 * microTasks.taskRun([{
 *   method: 'utils.set',
 *   params: ['foo', true]
 * }])
 * // payload.foo = true
 */
microTasks.methodRegister('utils.set', function (to, from) {
  _.set(this, to, from)
})

/**
 * Wait for `time` milliseconds before resolving the action.
 * @function
 * @name 'utils.wait'
 * @param {number} time time to wait
 * @example
 * microTasks.taskRun([{
 *   method: 'utils.wait',
 *   params: 10000 // 10 seconds
 * }])
 */
microTasks.methodRegister('utils.wait', (time = 0) => {
  return new Promise((resolve) => setTimeout(resolve, time))
})
