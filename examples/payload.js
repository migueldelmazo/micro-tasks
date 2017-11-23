const _ = require('lodash'),
  microTasks = require('../src')

microTasks.methodRegister('print', (value) => {
  console.log(value)
})

microTasks.methodRegister('setPayload', function (key, value) {
  _.set(this, key, value)
})

microTasks.taskRun([
  {
    method: 'print',
    params: '{payload.user.name}'
  },
  {
    method: 'print',
    params: '{payload.user.yearOfBirth}'
  },
  {
    method: 'print',
    params: '{{payload.user.name}} was born in {{payload.user.yearOfBirth}}'
  },
  {
    method: 'setPayload',
    params: ['user.yearOfBirth', 2000]
  },
  {
    method: 'print',
    params: '{{payload.user.name}} was born in {{payload.user.yearOfBirth}}'
  }
], {
  user: {
    name: 'Miguel',
    yearOfBirth: 1983
  }
})
