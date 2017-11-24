const microTasks = require('../src')

microTasks.methodRegister('conditionalAction', (value) => {
  return value
})

microTasks.methodRegister('print', (value) => {
  console.log('Messaje: ' + value)
})

microTasks.taskRun([
  {
    if: {
      method: 'conditionalAction',
      params: true,
      equalTo: true
    },
    method: 'print',
    params: 'This action is executed because conditionalAction is ok'
  },
  {
    if: {
      method: 'conditionalAction',
      params: true,
      equalTo: false
    },
    method: 'print',
    params: 'This action is not executed because conditionalAction is not ok'
  }
])
