/**
 * Registers the actions, contexts, hooks and methods of the module **validate** in microTasks.
 * @module validate
 */
const _ = require('lodash'),
  microTasks = require('../src')

/**
 * @name context items registered
 * @param {RegExp} validate.regexEmail Email regular expresion
 */
microTasks.contextSet('validate.regexEmail', '^(([A-Za-z0-9]+(?:[.-_+][A-Za-z0-9-_]+)*)@([A-Za-z0-9-]+(?:.[A-Za-z0-9]+)*(?:.[A-Za-z]{2,})))$')

/**
 * @function
 * @returns {boolean} Returns if value is an array.
 * @name 'validate.isArray'
 * @param {string} value Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isArray', params: '{payload.userList}' })
 */
microTasks.methodRegister('validate.isNumber', (value) => _.isArray(value))

/**
 * @function
 * @returns {boolean} Returns if value is an email.
 * @name 'validate.isEmail'
 * @param {string} value Email value
 * @example
 * microTasks.actionRegister({ method: 'validate.isEmail', params: '{payload.userEmail}' })
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
 * microTasks.actionRegister({ method: 'validate.isEmpty', params: '{payload.userEmail}' })
 */
microTasks.methodRegister('validate.isEmpty', (value) => {
  return value === undefined || value === null || value === ''
})

/**
 * @function
 * @returns {boolean} Returns if value is great than other.
 * @name 'validate.isGreatThan'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isGreatThan', params: ['{payload.userAge}', 18] })
 */
microTasks.methodRegister('validate.isGreatThan', (value, other) => _.gt(value, other))

/**
 * @function
 * @returns {boolean} Returns if value is great than or equal to other.
 * @name 'validate.isGreatThanOrEqualTo'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isGreatThanOrEqualTo', params: ['{payload.userAge}', 18] })
 */
microTasks.methodRegister('validate.isGreatThanOrEqualTo', (value, other) => _.gte(value, other))

/**
 * @function
 * @returns {boolean} Returns if value is less than other.
 * @name 'validate.isLessThan'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isLessThan', params: ['{payload.userAge}', 18] })
 */
microTasks.methodRegister('validate.isLessThan', (value, other) => _.lt(value, other))

/**
 * @function
 * @returns {boolean} Returns if value is less than or equal to other.
 * @name 'validate.isLessThanOrEqualTo'
 * @param {*} value Value
 * @param {*} other Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isLessThanOrEqualTo', params: ['{payload.userAge}', 18] })
 */
microTasks.methodRegister('validate.isLessThanOrEqualTo', (value, other) => _.lte(value, other))

/**
 * @function
 * @returns {boolean} Returns if value is not empty.
 * @name 'validate.isNotEmpty'
 * @param {*} value Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isNotEmpty', params: '{payload.userEmail}' })
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
 * microTasks.actionRegister({ method: 'validate.isNull', params: '{payload.userAge}' })
 */
microTasks.methodRegister('validate.isNumber', (value) => _.isNull(value))

/**
 * @function
 * @returns {boolean} Returns if value is a number.
 * @name 'validate.isNumber'
 * @param {*} value Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isNumber', params: '{payload.userAge}' })
 */
microTasks.methodRegister('validate.isNumber', (value) => _.isNumber(value))

/**
 * @function
 * @returns {boolean} Returns if value is a plain object.
 * @name 'validate.isPlainObject'
 * @param {*} value Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isPlainObject', params: '{payload.user}' })
 */
microTasks.methodRegister('validate.isPlainObject', (value) => _.isPlainObject(value))

/**
 * @function
 * @returns {boolean} Returns if value is a string.
 * @name 'validate.isString'
 * @param {*} value Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isString', params: '{payload.userEmail}' })
 */
microTasks.methodRegister('validate.isString', (value) => _.isString(value))

/**
 * @function
 * @returns {boolean} Returns if value is UNDEFINED.
 * @name 'validate.isUndefined'
 * @param {*} value Value
 * @example
 * microTasks.actionRegister({ method: 'validate.isUndefined', params: '{payload.userEmail}' })
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
 * microTasks.actionRegister({ method: 'validate.isNumber', params: '{payload.userAge}' })
 */
microTasks.methodRegister('validate.validator', (validator, err, ...args) => {
  const result = microTasks.methodRun(validator, ...args)
  if (_.isPromise(result)) {
    return result.catch(() => microTasks.reject(err))
  } else if (result === false) {
    return microTasks.reject(err)
  }
})

microTasks.methodRegister('validate.isGreatThanNow', (value) => value > Date.now())

microTasks.methodRegister('validate.isLessThanNow', (value) => value < Date.now())
