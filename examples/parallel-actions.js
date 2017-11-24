const microTasks = require('../src')

microTasks.methodRegister('print', (message, time = 0) => {
  console.log('Start: ' + message)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('End: ' + message)
      resolve()
    }, time)
  })
})

microTasks.taskRun([
  {
    method: 'print',
    params: 'Action 1'
  },
  {
    parallel: true,
    actions: [
      {
        method: 'print',
        params: ['Action 2.1', 1000]
      },
      {
        method: 'print',
        params: ['Action 2.2', 3000]
      },
      {
        method: 'print',
        params: ['Action 2.3', 2000]
      }
    ]
  },
  {
    method: 'print',
    params: 'Action 3'
  }
])
