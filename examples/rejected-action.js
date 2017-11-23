const microTasks = require('../src')

microTasks.methodRegister('rejectAction', () => {
  return new Promise((resolve, reject) => {
    /* eslint prefer-promise-reject-errors: 0 */
    reject()
  })
})

microTasks.methodRegister('print', (value) => {
  console.log('Messaje:' + value)
})

microTasks.taskRun([
  {
    method: 'print',
    params: 'Hello world'
  },
  {
    method: 'rejectAction'
  },
  {
    method: 'print',
    params: 'This action is not executed because the previous action has been rejected'
  },
  {
    catch: true,
    method: 'print',
    params: 'This action is only executed if a previous action is rejected'
  }
])
