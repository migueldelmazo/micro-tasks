const microTasks = require('../src')

microTasks.methodRegister('math.add', (a = 0, b = 1) => a + b)

microTasks.methodRegister('math.substract', (a = 0, b = 1) => a - b)
