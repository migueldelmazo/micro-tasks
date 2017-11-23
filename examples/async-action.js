const microTasks = require('../src')

microTasks.methodRegister('asyncMethod', () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
})

microTasks.methodRegister('helloWorld', (value) => {
  console.log('Hello ' + value)
})

microTasks.taskRun([
  {
    method: 'helloWorld',
    params: 'world'
  },
  {
    method: 'asyncMethod'
  },
  {
    method: 'helloWorld',
    params: 'everybody'
  }
])
