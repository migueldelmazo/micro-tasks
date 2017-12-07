const microTasks = require('../src')

require('../libs/utils')

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
    params: '1º action'
  },
  {
    method: 'asyncMethod'
  },
  {
    method: 'print',
    params: '3º action 5 seconds after'
  }
])
  .then((payload) => {
    const time = microTasks.methodRun('utils.getTaskTime', payload)
    console.log(time + ' milliseconds')
  })
