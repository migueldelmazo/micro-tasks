const microTasks = require('../src')

microTasks.contextSet('user', { name: 'Miguel', yearOfBirth: 1983 })

microTasks.methodRegister('print', (value) => {
  console.log(value)
})

microTasks.taskRun([
  {
    method: 'print',
    params: '{context.user.name}'
  },
  {
    method: 'print',
    params: '{context.user.yearOfBirth}'
  },
  {
    method: 'print',
    params: '{{context.user.name}} was born in {{context.user.yearOfBirth}}'
  }
])
