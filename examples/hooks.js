// ToDo: add more hooks
const microTasks = require('../src')

microTasks.hookRegister('microTasks.onActionEnd', (payload) => {
  console.log('onActionEnd', payload)
})

microTasks.hookRegister('microTasks.onActionError', (payload) => {
  console.log('onActionError', payload)
})

microTasks.hookRegister('microTasks.onActionRejected', (payload) => {
  console.log('onActionRejected', payload)
})

microTasks.hookRegister('microTasks.onGlobalError', (payload) => {
  console.log('onGlobalError', payload)
})

microTasks.hookRegister('microTasks.onTaskEnd', (payload) => {
  console.log('onTaskEnd', payload)
})

microTasks.hookRegister('microTasks.onTaskError', (payload) => {
  console.log('onTaskError', payload)
})

microTasks.hookRegister('microTasks.onTaskRejected', (payload) => {
  console.log('onTaskRejected', payload)
})

microTasks.hookRegister('microTasks.onTaskStart', (payload) => {
  console.log('onTaskStart', payload)
})

microTasks.methodRegister('print', (value) => {
  console.log('Messaje: ' + value)
})

microTasks.methodRegister('rejectAction', () => {
  return new Promise((resolve, reject) => {
    /* eslint prefer-promise-reject-errors: 0 */
    reject()
  })
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
  },
  {
    method: 'fua'
  }
])
