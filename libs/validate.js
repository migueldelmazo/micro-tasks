const _ = require('lodash'),
  microTasks = require('../src')

// context

microTasks.contextSet('validate.regexEmail', '^(([A-Za-z0-9]+(?:[.-_+][A-Za-z0-9-_]+)*)@([A-Za-z0-9-]+(?:.[A-Za-z0-9]+)*(?:.[A-Za-z]{2,})))$')

// methods

microTasks.methodRegister('validate.isEmail', (value) => {
  const regex = new RegExp(microTasks.contextGet('validate.regexEmail'))
  return regex.test(value)
})

microTasks.methodRegister('validate.isEmpty', (value) => {
  return value === undefined || value === null || value === ''
})

microTasks.methodRegister('validate.isNotEmpty', (value) => {
  return !microTasks.methodRun('validate.isEmpty', value)
})

microTasks.methodRegister('validate.isNumber', (value) => {
  return _.isNumber(value)
})

microTasks.methodRegister('validate.validator', (validator, err, ...args) => {
  const result = microTasks.methodRun(validator, ...args)
  if (_.isPromise(result)) {
    return result.catch(() => microTasks.reject(err))
  } else if (result === false) {
    return microTasks.reject(err)
  }
})
