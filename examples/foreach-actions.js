const microTasks = require('../src')

require('../libs/logger')
require('../libs/utils')
require('../libs/validate')

microTasks.methodRegister('print', (message) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Messaje:', message)
      if (message.fua === 40) {
        reject(message)
      } else {
        resolve(message)
      }
    }, 500)
  })
})

microTasks.taskRun([
  {
    method: 'utils.set',
    params: ['users', { uno: 1, dos: 2 }]
  },
  {
    foreach: {
      items: '{payload.users}',
      as: 'user'
    },
    actions: [
      {
        if: {
          method: 'validate.isEqual',
          param: '{userIndex}',
          equalTo: true
        },
        method: 'print',
        params: {
          keyValue: '{userKey}',
          keyStr: '{{userKey}}',
          valueValue: '{userValue}',
          valueStr: '{{userValue}}',
          idxValue: '{userIndex}',
          idxStr: '{{userIndex}}'
        },
        resultPath: 'fua[{{userIndex}}]'
      }
    ]
  },
  {
    method: 'print',
    params: 'fin'
  }
])
