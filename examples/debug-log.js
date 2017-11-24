const microTasks = require('../src')

microTasks.methodRegister('print', (message) => {
  console.log('Messaje:' + message)
})

microTasks.methodRegister('conditionalAction', (value) => {
  return value
})

microTasks.taskRun([
  {
    if: {
      method: 'conditionalAction',
      params: '{payload.myCondition}',
      equalTo: true
    },
    method: 'print',
    params: 'This action is executed because conditionalAction is ok'
  }
],
{
  myCondition: true
})
  .then((payload) => {
    console.log(payload.__actions[0])
  })
