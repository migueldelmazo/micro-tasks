const microTasks = require('../src')

// log context, methods and tasks
microTasks.logConfig()

microTasks.methodRegister('fua', function () {
  return true
})

// run task
microTasks.tasksRun([
  {
    method: 'validate',
    params: [
      {
        validator: 'validateIsEmail',
        errorCode: 'invalidEmail'
      },
      '{payload.email}'
    ]
  },
  {
    method: 'request.send',
    params: {
      headers: { 'Content-Type': 'text/html' },
      hostname: 'www.migueldelmazo.com'
    }
  },
  {
    method: 'utils.set',
    params: ['user', 1]
  },
  {
    method: 'utils.set',
    params: ['user', 2],
    if: {
      method: 'fua',
      params: 123
    }
  }
], {
  email: 'info@migueldelmazo.com'
})
