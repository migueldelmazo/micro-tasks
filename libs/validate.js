const _ = require('lodash'),
  microTasks = require('../src')

// context

microTasks.contextSet('validateRegexEmail', '^(([A-Za-z0-9]+(?:[.-_+][A-Za-z0-9-_]+)*)@([A-Za-z0-9-]+(?:.[A-Za-z0-9]+)*(?:.[A-Za-z]{2,})))$')

// methods

microTasks.methodRegister('validateIsEmail', (value) => {
  const regex = new RegExp(microTasks.contextGet('validateRegexEmail'))
  return regex.test(value)
})

microTasks.methodRegister('validateIsEmpty', (value) => {
  return _.isEmpty(value)
})

microTasks.methodRegister('validateIsNotEmpty', (value) => {
  return !_.isEmpty(value)
})

microTasks.methodRegister('validate', (validator, err, ...args) => {
  const result = microTasks.methodRun(validator, ...args)
  if (_.isPromise(result)) {
    return result.catch(() => microTasks.reject(err))
  } else if (result === false) {
    return microTasks.reject(err)
  }
})
