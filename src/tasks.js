/**
 * @module microTasks
 * @desc Microtasks is a tool to execute a list of tasks with declarative programming
 */
const _ = require('./lodash'),

  context = {},
  hooks = {},
  methods = {},
  tasks = {},

  // tasks: promise handlers

  taskGetPromise = (payload) => {
    let promise = new Promise((resolve) => resolve())
    _.each(payload.tasks, (task) => {
      if (task.catch) {
        promise = promise.catch(taskCatchStart.bind(null, payload, task))
        promise = promise.then(taskCatchEnd.bind(null, payload, task))
      } else {
        promise = promise.then(taskThenStart.bind(null, payload, task))
        promise = promise.then(taskThenEnd.bind(null, payload, task))
      }
    })
    promise = promise.catch(taskPromiseCatch.bind(null, payload))
    promise = promise.then(taskPromiseThen.bind(null, payload))
    return promise
  },

  taskCatchStart = (payload, task, result) => {
    taskSetRejectedError(payload, result)
    taskSetResult(payload, result)
    taskSetStatus(payload, 'rejected')
    taskSetCurrent(payload, task)
    taskSetStatus(payload, 'solving')
    return taskRun(payload, result)
  },

  taskCatchEnd = (payload, task, result) => {
    if (taskIsCurrent(payload, task)) {
      taskSetResult(payload, result)
      taskSetStatus(payload, 'rejected')
      taskSetCurrent(payload)
    }
  },

  taskThenStart = (payload, task) => {
    taskSetCurrent(payload, task)
    taskSetStatus(payload, 'solving')
    return taskRun(payload)
  },

  taskThenEnd = (payload, task, result) => {
    if (taskIsCurrent(payload, task)) {
      taskSetResult(payload, result)
      taskSetStatus(payload, 'solved')
      taskSetCurrent(payload)
    }
  },

  taskPromiseCatch = (payload, err) => {
    taskSetRejectedError(payload, err)
    taskSetStatus(payload, 'error')
    taskSetCurrent(payload)
    module.exports.hookRun('logger.error', 'taskPromiseCatch: promise unhandled error', payload, err)
  },

  taskPromiseThen = (payload) => {
    module.exports.hookRun('logger.log', payload)
  },

  // tasks: run method

  taskRun = (payload, ...args) => {
    if (!taskIsConditionalTask(payload) || taskRunConditionalMethod(payload)) {
      return taskRunMethod(payload, payload.tasks.current, ...args)
    }
  },

  taskIsConditionalTask = (payload) => {
    return _.isPlainObject(payload.tasks.current.if)
  },

  taskRunConditionalMethod = (payload) => {
    return taskRunMethod(payload, payload.tasks.current.if)
  },

  taskRunMethod = (payload, data, ...args) => {
    const parsedParams = _.compileData(_.parseArray(data.params), { payload, context }),
      methodParams = [].concat(args, parsedParams)
    data.parsedParams = parsedParams
    return module.exports.methodRun.call(payload, data.method, ...methodParams)
  },

  // tasks: helpers

  taskIsCurrent = (payload, task) => {
    return payload.tasks.current === task
  },

  taskParsePayload = (tasks, tasksPayload) => {
    const payload = tasksPayload === undefined ? {} : _.cloneDeep(tasksPayload)
    payload.tasks = taskParseTasks(tasks)
    return payload
  },

  taskParseTasks = (tasks) => {
    return _.map(_.cloneDeep(tasks), (task) => {
      return _.isEmpty(tasks[task.name]) ? task : _.defaults(task, tasks[task.name])
    })
  },

  taskSetCurrent = (payload, task) => {
    payload.tasks.current = task
  },

  taskSetStatus = (payload, status) => {
    payload.tasks.current.status = status
  },

  taskSetRejectedError = (payload, err) => {
    if (_.isError(err)) {
      payload.tasks.errors = _.parseArray(payload.tasks.errors)
      payload.tasks.errors.push({
        current: payload.tasks.current,
        errorMessage: err.message,
        errorStack: _.stack()
      })
    }
  },

  taskSetResult = (payload, result) => {
    result = _.cloneDeep(result)
    payload.tasks.current.result = result
    if (payload.tasks.current.resultPath) {
      _.set(payload, payload.tasks.current.resultPath, result)
    }
  },

  // hooks: helpers

  hookExists = (hookName) => {
    return _.has(hooks, hookName)
  },

  // methods: helpers

  methodExists = (methodName) => {
    return _.has(methods, methodName)
  }

module.exports = {

  /**
   * Returns a context item.
   * @param {string} key Item key
   * @param {*} defaultValue Returned value if `context[key]` is `undefined`
   * @returns {*}
   * @example
   * microTasks.contextGet('undefined_key') // undefined
   * microTasks.contextGet('undefined_key', 123) // 123
   * microTasks.contextSet('gravity', 9.8)
   * microTasks.contextGet('gravity') // 9.8
   */
  contextGet (key, defaultValue) {
    return _.get(context, key, defaultValue)
  },

  /**
   * Set an item into microTasks context.
   * It is useful for setting values that can be used by the tasks and in the methods.
   * Each item can be overwritten as many times as you want.
   * @param {string} key Item key
   * @param {*} value Item value
   * @example
   * microTasks.contextSet('gravity', 9.8)
   * microTasks.contextGet('gravity') // 9.8
   * microTasks.contextSet('gravity', 9.80665)
   * microTasks.contextGet('gravity') // 9.80665
   */
  contextSet (key, value) {
    _.set(context, key, value)
  },

  /**
   * Register a hook in microTasks.
   * It is useful to intercept the flow of the program. The hook method is executed when an event happens.
   * The hook method has previously been [registered]{@link methodRegister}.
   * @param {string} hookName Hook name
   * @param {function} methodName Method name that has previously been registered
   * @hooks `logger.error`, `logger.log`
   * @example
   * microTasks.hookRegister('logger.log', 'logger.log')
   */
  hookRegister (hookName, methodName) {
    if (_.isString(hookName) && methodExists(methodName)) {
      _.set(hooks, hookName, methodName)
    } else {
      module.exports.hookRun('logger.error', 'hookRegister: invalid hook', hookName, methodName)
    }
  },

  /**
   * Executes a hook.
   * The hook method has previously been [registered]{@link methodRegister}.
   * @param {string} hookName Hook name
   * @param {*} [arguments] Hook arguments
   * @example
   * hookRun('logger.log', 'name', user.name, 'email', user.email)
   */
  hookRun (hookName, ...args) {
    if (hookExists(hookName)) {
      module.exports.methodRun(_.get(hooks, hookName), ...args)
    }
  },

  /**
   * Executes `logger.log` hook with microTask configuration: `context`, `hooks`, `methods` and `tasks`
   * @example
   * microTasks.logConfig()
   */
  logConfig () {
    module.exports.hookRun('logger.log', 'config', { context, hooks, methods, tasks })
  },

  /**
   * Register a method in microTasks to be executed by tasks and hooks.
   * @param {string} methodName Method name
   * @param {function} method Method function
   * @example
   * microTasks.methodRegister('request.send', (endpoint) => { ... })
   * microTasks.methodRegister('request.send', function (endpoint) { ... })
   */
  methodRegister (methodName, method) {
    if (_.isString(methodName) && _.isFunction(method)) {
      _.set(methods, methodName, method)
    } else {
      module.exports.hookRun('logger.error', 'methodRegister: invalid method', methodName, method)
    }
  },

  /**
   * Executes a method that has previously been [registered]{@link methodRegister}.
   * @param {string} methodName Method name
   * @param {*} [arguments] Method arguments
   * @example
   * microTasks.methodRun('request.send', { method: 'GET', protocol: 'https', hostname: 'github.com' })
   */
  methodRun (methodName, ...args) {
    if (methodExists(methodName)) {
      return _.get(methods, methodName).call(this, ...args)
    } else {
      module.exports.hookRun('logger.error', 'methodRun: invalid method', methodName, ...args)
    }
  },

  /**
   * Rejects a task with data.
   * @param {*} data Data with which the task is rejected. Inside `task.method`, `this.foo` is the same than `payload.foo`
   * @returns {promise} Rejected promises
   * @example
   * microTasks.reject({ errorCode: 'not_found', errorStatus: 404 })
   */
  reject (data) {
    return new Promise((resolve, reject) => reject(data))
  },

  /**
   * Register a task in microTasks.
   * @param {object} task Task configuration
   * @param {string} task.method Method that is executed when running the task. **IMPORTANT:** if `task.method` is asynchronous it has to return a promise
   * @param {*} [task.params] List of parameters for the `task.method`. If it is not an array, it is wrapped in an array
   * @param {object} [task.if] If the `if` property exists, the `task.method` is only executed if the `tasks.if.method` returns true
   * @param {string} [task.if.method] This method validates if the `taks.method` must be executed
   * @param {*} [task.if.params] List of parameters for the `task.if.method`
   * @param {string} [task.resultPath] If it exists, the return value of the `task.method` is set on the `payload.resultPath`
   * @param {boolean} [task.catch] Specifies that this task captures errors from previous tasks. `false` by default
   * @example
   * microTasks.taskRegister({
   *    if: { // check if payload.email is a valid email
   *      method: 'validate.isEmail',
   *      params: '{{payload.email}}'
   *    },
   *    method: 'request.send',  // send a request
   *    params: {
   *      body: { // request post data: https://api.github.com/user/login
   *        email: '{{payload.email}}',
   *        password: '{{payload.password}}',
   *        role: 'user'
   *      },
   *      hostname: 'api.github.com', // request turl: https://api.github.com/user/login
   *      path: 'user/login'
   *      protocol: 'https',
   *      method: 'POST'
   *    },
   *    resultPath: 'userModel' // set the response in payload.userModel
   * })
   */
  taskRegister (task) {
    if (_.isPlainObject(task) && _.isString(task.name)) {
      _.set(tasks, task.name, task)
    } else {
      module.exports.hookRun('logger.error', 'taskRegister: invalid task', task)
    }
  },

  /**
   * Executes a task list. microTask converts a list of tasks into a promise. Each task can be resolved or rejected.
   * @param {array} tasks Task list
   * @param {string} [task] Task configuration. Each task can have the same configuration defined [here]{@link taskRegister}.
   * @param {string} [task[].name] Name of the task.
   * If there is a [registered task]{@link taskRegister} with this name, this task is extended with the configuration of the registered task
   * @param {object} [payload] Payload of the tasks. This is an object shared by all tasks in the list.
   * Is the javascript execution context of `task.method`. Inside `task.method`, `this.foo` is the same than `payload.foo`
   * @returns {promise} returns an initialized promise
   * @example
   * microTasks.tasksRun([
   *  {
   *    name: 'request.send',
   *    method: 'request.send',
   *    params: {
   *      headers: { 'Content-Type': 'text/html' },
   *      hostname: 'github.com'
   *    }
   *  }
   * ])
   */
  tasksRun (tasks, payload) {
    return taskGetPromise(taskParsePayload(tasks, payload))
  }

}
