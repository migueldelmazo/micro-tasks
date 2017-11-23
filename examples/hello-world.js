const microTasks = require('../src')

microTasks.methodRegister('helloWorld', (value) => {
  console.log('Hello ' + value)
})

console.log('Current microTasks config:', microTasks.config())

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
