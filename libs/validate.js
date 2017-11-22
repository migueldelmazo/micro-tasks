/**
 * Registers the actions, contexts, hooks and methods of the module **validate** in microTasks.
 * @module validate
 */
const _ = require('lodash'),
  microTasks = require('../src')

/**
 * Context item list registered in microTasks.
 * @name context
 * @param {RegExp} validate.regexEmail Email regular expresion
 */
microTasks.contextSet('validate.regexEmail', '^(([A-Za-z0-9]+(?:[.-_+][A-Za-z0-9-_]+)*)@([A-Za-z0-9-]+(?:.[A-Za-z0-9]+)*(?:.[A-Za-z]{2,})))$')

/**
 * @function
 * @returns {boolean} Returns if value is an array.
 * @name 'validate.isArray'
 * @param {string} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isArray', params: [[1, 2, 3]], resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isArray', _.isArray)

/**
 * @function
 * @returns {boolean} Returns if value is an email.
 * @name 'validate.isEmail'
 * @param {string} value Email value
 * @example
 * microTasks.taskRun([{ method: 'validate.isEmail', params: 'info@migueldelmazo.com', resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isEmail', (value) => {
  const regex = new RegExp(microTasks.contextGet('validate.regexEmail'))
  return regex.test(value)
})

/**
 * @function
 * @returns {boolean} Returns if value is empty.
 * @name 'validate.isEmpty'
 * @param {*} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isEmpty', params: '', resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isEmpty', _.isEmpty)

/**
 * @function
 * @returns {boolean} Returns if value is equal than other.
 * @name 'validate.isEqual'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isEqual', params: [1, 1], resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isEqual', _.isEqual)

/**
 * @function
 * @returns {boolean} Returns if value is great than other.
 * @name 'validate.isGreatThan'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isGreatThan', params: [2, 1], resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isGreatThan', _.gt)

/**
 * @function
 * @returns {boolean} Returns if value is great than or equal to other.
 * @name 'validate.isGreatThanOrEqualTo'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isGreatThanOrEqualTo', params: [1, 1], resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isGreatThanOrEqualTo', _.gte)

/**
 * @function
 * @returns {boolean} Returns if value is less than other.
 * @name 'validate.isLessThan'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isLessThan', params: [1, 2], resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isLessThan', _.lt)

/**
 * @function
 * @returns {boolean} Returns if value is less than or equal to other.
 * @name 'validate.isLessThanOrEqualTo'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isLessThanOrEqualTo', params: [1, 1], resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isLessThanOrEqualTo', _.lte)

/**
 * @function
 * @returns {boolean} Returns if value is not empty.
 * @name 'validate.isNotEmpty'
 * @param {*} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isNotEmpty', params: 'foo', resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isNotEmpty', (value) => {
  return !microTasks.methodRun('validate.isEmpty', value)
})

/**
 * @function
 * @returns {boolean} Returns if value is NULL.
 * @name 'validate.isNull'
 * @param {*} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isNull', params: [null], resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isNull', _.isNull)

/**
 * @function
 * @returns {boolean} Returns if value is a number.
 * @name 'validate.isNumber'
 * @param {*} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isNumber', params: 1, resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isNumber', _.isNumber)

/**
 * @function
 * @returns {boolean} Returns if value is a plain object.
 * @name 'validate.isPlainObject'
 * @param {*} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isPlainObject', params: { one: 1 }, resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isPlainObject', _.isPlainObject)

/**
 * @function
 * @returns {boolean} Returns if value is a string.
 * @name 'validate.isString'
 * @param {*} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isString', params: 'foo', resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isString', _.isString)

/**
 * @function
 * @returns {boolean} Returns if value is UNDEFINED.
 * @name 'validate.isUndefined'
 * @param {*} value Value
 * @example
 * microTasks.taskRun([{ method: 'validate.isUndefined', params: undefined, resultPath: 'is' }])
 * // payload.is = true
 */
microTasks.methodRegister('validate.isUndefined', (value) => _.isUndefined(value))

/**
 * @function
 * @returns {promise} Returns a rejected promise if validator method returns `false` or a `rejected promise`.
 * @name 'validate.validator'
 * @param {string} validator Validator method name
 * @param {*} error Error with which the promise is rejected
 * @param {*} [args] Other arguments
 * @example
 * microTasks.taskRun([{
 *   method: 'validate.validator',
 *   params: ['validate.isNumber', 'It is not a number', 1]
 * }])
 * microTasks.taskRun([{
 *   method: 'validate.validator',
 *   params: ['validate.isNumber', 'It is not a number', '1']
 * }])
 */
microTasks.methodRegister('validate.validator', (validator, err, ...args) => {
  const result = microTasks.methodRun(validator, ...args)
  if (_.isPromise(result)) {
    return result.catch(() => microTasks.reject(err))
  } else if (result === false) {
    return microTasks.reject(err)
  }
})
