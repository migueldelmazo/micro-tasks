const microTasks = require('../src')

// methods

microTasks.methodRegister('logger.error', (...args) => {
  console.error('error', ...args)
})

microTasks.methodRegister('logger.log', (...args) => {
  console.log('log', ...args)
})

// hooks

microTasks.hookRegister('logger.error', 'logger.error')

microTasks.hookRegister('logger.log', 'logger.log')
