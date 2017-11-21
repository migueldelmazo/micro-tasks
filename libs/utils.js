/**
 * Registers the actions, contexts, hooks and methods of the module **utils** in [microTasks]{@link module:microTasks}.
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
 *    method: 'utils.copy',
 *    params: { 'newUserId': 'user.id', 'newUserAge': 'user.email' },
 * }],
 * {
 *   user: { id: 123, age: 18 } // payload
 * })
 *
 * // payload = { user: { id: 123, age: 18 }, newUserId: 123, newUserAge: 18 }
 */
microTasks.methodRegister('utils.copy', function (definition) {
  _.each(definition, (value, key) => {
    _.set(this, key, _.get(this, value))
  })
})

/**
 * Set a value in payload.
 * @function
 * @name 'utils.set'
 * @param {string} to destination path in payload
 * @param {*} from source value in payload
 * @example
 * microTasks.actionRegister({
 *  method: 'utils.set',
 *  params: ['isValidEmail', true] // payload.isValidEmail = true
 * })
 *
 * microTasks.actionRegister({
 *  method: 'utils.set',
 *  params: ['userEmail', '{requestData.queryParams.email}'] // payload.userEmail = 'info@migueldelmazo.com'
 * })
 */
microTasks.methodRegister('utils.set', function (to, from) {
  _.set(this, to, from)
})

/**
 * @name actions registered
 * @param {method} utils.copy Executes `utils.copy` method
 * @param {method} utils.set Executes `utils.set` method
 */
microTasks.actionRegister({
  name: 'utils.copy',
  method: 'utils.copy'
})

microTasks.actionRegister({
  name: 'utils.set',
  method: 'utils.set'
})
