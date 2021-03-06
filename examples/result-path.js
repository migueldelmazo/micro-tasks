const microTasks = require('../src')

microTasks.methodRegister('getDate', () => {
  return new Date().toString()
})

microTasks.taskRun([
  {
    method: 'getDate',
    resultPath: 'today'
  }
])
  .then((payload) => {
    console.log('Result path is: ', payload.today)
  })
