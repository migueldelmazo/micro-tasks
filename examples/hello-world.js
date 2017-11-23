const microTasks = require('../src')

microTasks.methodRegister('helloWorld', (value) => {
  console.log('Hello ' + value)
})

microTasks.taskRun([
  {
    method: 'helloWorld',
    params: 'world'
  },
  {
    method: 'helloWorld',
    params: 'everybody'
  }
])
