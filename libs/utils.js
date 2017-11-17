const _ = require('lodash'),
  microTasks = require('../src')

// methods

microTasks.methodRegister('utils.copy', function (definition) {
  _.each(definition, (value, key) => {
    _.set(this, key, _.get(this, value))
  })
})

microTasks.methodRegister('utils.set', function (key, value) {
  _.set(this, key, value)
})

// tasks

microTasks.actionRegister({
  name: 'utils.copy',
  method: 'utils.copy'
})

microTasks.actionRegister({
  name: 'utils.set',
  method: 'utils.set'
})
