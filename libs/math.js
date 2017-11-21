const microTasks = require('../src')

microTasks.methodRegister('utils.add', (a = 0, b = 1) => a + b)

microTasks.methodRegister('utils.substract', (a = 0, b = 1) => a - b)
