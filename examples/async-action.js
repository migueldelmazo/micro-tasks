const microTasks = require('../src')

microTasks.methodRegister('asyncMethod', () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
})

microTasks.methodRegister('print', (value) => {
  console.log('Messaje: ' + value)
})

microTasks.taskRun([
  {
    method: 'print',
    params: '1º message'
  },
  {
    method: 'asyncMethod'
  },
  {
    method: 'print',
    params: '2º message 5 seconds after'
  }
])
