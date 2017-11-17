const microTasks = require('../src')

// log context, methods and tasks
microTasks.logConfig()

microTasks.methodRegister('conditionalMethod', function (value) {
  return value
})

microTasks.methodRegister('conditionalAsyncMethod', function (value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(value)
      } else {
        reject(value)
      }
    }, 1000)
  })
})

microTasks.methodRegister('validateIsEqual', (a, b, err) => {
  if (a !== b) {
    throw new Error(err)
  }
})

microTasks.methodRegister('validateIsSame', (a, b, err) => {
  if (a !== b) {
    return microTasks.reject(err)
  }
})

// run task
microTasks.taskRun([
  {
    // copy payload.one in payload.copied.one and copy payload.two in payload.copied.two
    method: 'utils.copy',
    params: {
      'copied.one': 'one',
      'copied.two': 'two'
    }
  },
  {
    // set payload.one in payload.setted.one as object (in this example as number)
    method: 'utils.set',
    params: ['setted.one', '{payload.one}']
  },
  {
    // set payload.one in payload.setted.one as string (see double braces)
    method: 'utils.set',
    params: ['setted.oneAsString', '{{payload.one}}']
  },
  {
    // set payload.two in payload.setted.two with implicit value
    method: 'utils.set',
    params: ['setted.two', 2]
  },
  {
    // if this condition does not pass
    if: {
      method: 'conditionalMethod',
      params: true,
      equalTo: true
    },
    // this method is not executed
    method: 'utils.set',
    params: ['conditional.conditionalMethod.first', 'has passed']
  },
  {
    // if this condition does not pass
    if: {
      method: 'conditionalMethod',
      params: true,
      equalTo: false
    },
    // this method is not executed
    method: 'utils.set',
    params: ['conditional.conditionalMethod.second', 'should not have passed']
  },
  {
    // if this async condition does not pass
    if: {
      method: 'conditionalAsyncMethod',
      params: true,
      equalTo: true
    },
    // this method is not executed
    method: 'utils.set',
    params: ['conditional.conditionalAsyncMethod.first', 'has passed']
  },
  {
    // if this async condition does not pass
    if: {
      method: 'conditionalAsyncMethod',
      params: true,
      equalTo: false
    },
    // this method is not executed
    method: 'utils.set',
    params: ['conditional.conditionalAsyncMethod.second', 'should not have passed']
  },
  {
    // this action throw an error
    method: 'validateIsEqual',
    params: ['a', 'b', 'both are not equal (rejected with error)']
  },
  {
    // this action is not executed because previous action throwed an error
    method: 'utils.set',
    params: ['error', 'this action should not have executed']
  },
  {
    // this action catch and handle the error
    catch: true,
    method: 'utils.set',
    params: ['catched.error', 'this action is only executed if `validateIsEqual` action was rejected']
  },
  {
    // this action is rejected
    method: 'validateIsSame',
    params: ['a', 'b', 'both are not equal (rejected)']
  },
  {
    // this action is not executed because previous action was rejected
    method: 'utils.set',
    params: ['error', 'this action should not have executed']
  },
  {
    // this action catch and handle the rejected action
    catch: true,
    method: 'utils.set',
    params: ['catched.promiseRejected', 'this action is only executed if `validateIsSame` action was rejected']
  }
], {
  // payload
  one: 1,
  two: 2
})
