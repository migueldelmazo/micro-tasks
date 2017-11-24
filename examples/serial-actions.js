const microTasks = require('../src')

microTasks.methodRegister('print', (message) => {
  console.log('Messaje:' + message)
})

microTasks.taskRun([
  {
    method: 'print',
    params: 'Action 1'
  },
  {
    actions: [
      {
        method: 'print',
        params: 'Action 2.1'
      },
      {
        method: 'print',
        params: 'Action 2.2'
      }
    ]
  },
  {
    actions: [
      {
        method: 'print',
        params: 'Action 3.1'
      },
      {
        method: 'print',
        params: 'Action 3.2'
      }
    ]
  },
  {
    method: 'print',
    params: 'Action 4'
  }
])
