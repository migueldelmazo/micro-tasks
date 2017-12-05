/**
 * @module microTasks
 * @desc **microTasks** is a tool to execute a task (list of actions) with **declarative programming**.
 */
const _ = require('./lodash'),

  actions = {},
  context = {},
  hooks = {},
  methods = {},
  tasks = {},

  // task: promise handlers

  taskGetPromise = (payload) => {
    return module.exports.resolve()
      .then(taskStart.bind(null, payload))
      .then(() => actionsGetPromise(payload.__actions, payload))
      .catch(taskCatch.bind(null, payload))
      .then(taskThen.bind(null, payload))
      .then(() => payload)
  },

  // actions: promise handlers

  actionsGetPromise = (actions, payload) => {
    let promise = module.exports.resolve()
    _.each(actions, (action) => {
      promise = action.catch
        ? promise.catch(actionCatch.bind(null, action, payload))
        : promise.then(actionThen.bind(null, action, payload))
    })
    return promise
  },

  actionCatch = (action, payload) => {
    return module.exports.resolve()
      .then(() => {
        actionSetTimer(action, 'start')
        actionSetStatus(action, 'solving')
        return actionRun(action, payload)
      })
      .then((result) => {
        actionSetResult(action, payload, result)
        actionSetStatus(action, 'solved')
        actionSetTimer(action, 'end')
        actionHook('microTasks.onActionEnd', { action, payload })
      })
  },

  actionThen = (action, payload) => {
    return module.exports.resolve()
      .then(() => {
        actionSetTimer(action, 'start')
        if (actionIsConditional(action)) {
          actionSetStatus(action, 'checking condition')
          return actionRun(action.if, payload)
        }
      })
      .catch((err) => actionSetErrorInPayload(payload, err))
      .then((result) => {
        if (actionIsConditional(action)) {
          actionSetConditionResult(action, result)
        }
        if (actionHasConditionPassed(action)) {
          actionSetStatus(action, 'solving')
          if (actionHasSubactions(action)) {
            if (actionIsParallel(action)) {
              return actionRunInParallel(action, payload)
            } else if (actionIsRace(action)) {
              return actionRunInRace(action, payload)
            } else {
              return actionRunInSeries(action, payload)
            }
          } else {
            return actionRun(action, payload)
          }
        }
      })
      .then((result) => {
        if (actionHasConditionPassed(action)) {
          actionSetResult(action, payload, result)
          actionSetStatus(action, 'solved')
        } else {
          actionSetStatus(action, 'ignored')
        }
        actionSetTimer(action, 'end')
        actionHook('microTasks.onActionEnd', { action, payload })
      })
      .catch((err) => {
        actionSetErrorInAction(action, err)
        actionSetErrorInPayload(payload, err)
        actionSetResult(action, payload, err)
        if (_.isError(err)) {
          actionSetStatus(action, 'error')
          actionSetTimer(action, 'end')
          actionHook('microTasks.onActionError', action, payload)
        } else {
          actionSetStatus(action, 'rejected')
          actionSetTimer(action, 'end')
          actionHook('microTasks.onActionRejected', action, payload)
        }
        return module.exports.reject(err)
      })
  },

  // actions: helpers

  actionHasConditionPassed = (action) => {
    return actionIsConditional(action)
      ? _.isEqual(action.if.equalTo, action.if.resultValue)
      : true
  },

  actionHasSubactions = (action) => {
    return _.isArray(action.actions)
  },

  actionHook = (hookName, ...args) => {
    module.exports.hookRun(hookName, ...args)
  },

  actionIsConditional = (action) => {
    return _.isPlainObject(action.if)
  },

  actionIsParallel = (action) => {
    return !!action.parallel
  },

  actionIsRace = (action) => {
    return !!action.race
  },

  actionRun = (action, payload) => {
    if (methodExists(action.method)) {
      action.params = _.parseArray(action.params)
      action.parsedParams = _.cloneDeep(_.compileData(action.params, { payload, context }))
      return module.exports.methodRun.call(payload, action.method, ...action.parsedParams)
    } else {
      throw new Error('actionRun: action.method "' + action.method + '" does not exist')
    }
  },

  actionRunInParallel = (action, payload) => {
    const promises = _.map(action.actions, (act) => actionThen(act, payload))
    return Promise.all(promises)
  },

  actionRunInRace = (action, payload) => {
    const promises = _.map(action.actions, (act) => actionThen(act, payload))
    return Promise.race(promises)
  },

  actionRunInSeries = (action, payload) => {
    return actionsGetPromise(action.actions, payload)
  },

  actionSetErrorInAction = (action, err) => {
    action.error = _.isError(err) ? err : _.cloneDeep(err)
  },

  actionSetErrorInPayload = (payload, err) => {
    if (_.isError(err)) {
      payload.__errors = _.parseArray(payload.__errors)
      payload.__errors.push(err)
    }
  },

  actionSetConditionResult = (action, result) => {
    action.if.resultValue = _.cloneDeep(result)
  },

  actionSetResult = (action, payload, result) => {
    if (action.resultPath) {
      result = _.isError(result) ? result : _.cloneDeep(result)
      action.resultValue = result
      payload[action.resultPath] = result
    }
  },

  actionSetStatus = (action, status) => {
    action.status = status
  },

  actionSetTimer = (action, type) => {
    _.set(action, 'time.' + type, Date.now())
    if (type === 'end') {
      _.set(action, 'time.duration', action.time.end - action.time.start)
    }
  },

  // task: helpers

  taskStart = (payload) => {
    return module.exports.hookRun('microTasks.onTaskStart', { payload })
  },

  taskCatch = (payload, err) => {
    payload.__unhandledError = err
    return module.exports.hookRun('microTasks.onTaskError', { payload, err })
  },

  taskThen = (payload) => {
    return module.exports.hookRun('microTasks.onTaskEnd', { payload })
  },

  // hooks helpers

  hookExists = (hookName) => {
    return _.has(hooks, hookName)
  },

  // methods helpers

  methodExists = (methodName) => {
    return _.isFunction(_.get(methods, methodName))
  },

  // task helpers

  taskParsePayload = (actions, taskPayload = {}) => {
    const payload = _.cloneDeep(taskPayload)
    payload.__actions = taskParseActions(actions)
    payload.__id = _.uniqueId()
    return payload
  },

  taskParseActions = (_actions) => {
    return _.map(_.cloneDeep(_actions), (action) => {
      const defaultAction = _.get(actions, action.name)
      return defaultAction ? _.defaults(action, defaultAction) : action
    })
  }

module.exports = {

  /**
   * Register a action in microTasks.
   * @param {object} action Task configuration. See [action configuration](./action.md#configuration).
   * @example
   * microTasks.actionRegister({...})
   */
  actionRegister (action) {
    if (_.isPlainObject(action) && _.isString(action.name)) {
      _.set(actions, action.name, action)
    } else {
      module.exports.hookRun('logger.error', {
        method: 'actionRegister',
        message: 'invalid action',
        args: { action }
      })
    }
  },

  /**
   * @param {string} key Item key
   * @param {*} defaultValue Returned value if `context[key]` is `undefined`
   * @returns {*} Returns a context item.
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
   * It is useful for setting values that can be used by the actions and in the methods.
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
   * It is useful to intercept the flow of the task. The hook method is executed when an event happens.
   * The hook method has previously been registered.
   *
   * Defined hooks (see [logger library for more info](./logger.md#logger-hooks)):
   *
   * - microTasks.onActionEnd
   * - microTasks.onActionError
   * - microTasks.onActionRejected
   * - microTasks.onTaskEnd
   * - microTasks.onTaskError
   *
   * @param {string} hookName Hook name
   * @param {*} method Method or method name that has previously been registered
   * @example
   * microTasks.hookRegister('logger.log', 'logger.log')
   * microTasks.hookRegister('logger.log', (...args) => console.log(...args))
   */
  hookRegister (hookName, methodName) {
    if (_.isString(hookName) && (methodExists(methodName) || _.isFunction(methodName))) {
      _.set(hooks, hookName, methodName)
    } else {
      module.exports.hookRun('logger.error', {
        method: 'hookRegister',
        message: 'invalid hook',
        args: { hookName, methodName }
      })
    }
  },

  /**
   * Executes a hook.
   * The hook method has previously been registered.
   * @param {string} hookName Hook name
   * @param {*} [arguments] Hook arguments
   * @example
   * hookRun('logger.log', 'name', user.name, 'email', user.email)
   */
  hookRun (hookName, ...args) {
    if (hookExists(hookName)) {
      const method = _.get(hooks, hookName)
      return (_.isFunction(method))
        ? method(...args)
        : module.exports.methodRun(method, ...args)
    }
  },

  /**
   * @returns microTasks current config
   * @example
   * microTasks.config() // { actions: {...}, context: {...}, hooks: {...}, methods: {...}, tasks: {...} }
   */
  config () {
    return { actions, context, hooks, methods, tasks }
  },

  /**
   * Register a method in microTasks to be executed by actions and hooks.
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
      module.exports.hookRun('logger.error', {
        method: 'methodRegister',
        message: 'invalid method',
        args: { methodName, method }
      })
    }
  },

  /**
   * Executes a method that has previously been registered.
   * @param {string} methodName Method name
   * @param {*} [arguments] Method arguments
   * @example
   * microTasks.methodRun('request.send', { method: 'GET', protocol: 'https', hostname: 'github.com' })
   */
  methodRun (methodName, ...args) {
    if (methodExists(methodName)) {
      return _.get(methods, methodName).call(this, ...args)
    } else {
      module.exports.hookRun('logger.error', {
        method: 'methodRun',
        message: 'invalid method',
        args: { methodName, args }
      })
    }
  },

  /**
   * @param {*} [data={}] Data with which the promise is rejected.
   * @returns {promise} Rejects a promise with data. Useful for reject actions.
   * @example
   * return microTasks.reject({ status: 404 })
   */
  reject (data) {
    return new Promise((resolve, reject) => reject(data))
  },

  /**
   * @param {*} [data={}] Data with which the promise is resoved.
   * @returns {promise} Resolves a promise with data. Useful for resove actions.
   * @example
   * return microTasks.resolve({ status: 200 })
   */
  resolve (data) {
    return new Promise((resolve) => resolve(data))
  },

  /**
   * Register a task list in microTasks.
   * @param {string} taskName Task name
   * @param {array} actions Action list
   * @example
   * microTasks.taskRegister('dbBackup', [])
   */
  taskRegister (taskName, actions) {
    if (!_.isString(taskName)) {
      module.exports.hookRun('logger.error', {
        method: 'taskRegister',
        message: 'invalid task name',
        args: { taskName }
      })
    } else if (!_.isArray(actions)) {
      module.exports.hookRun('logger.error', {
        method: 'taskRegister',
        message: 'invalid actions',
        args: { actions }
      })
    } else {
      tasks[taskName] = _.cloneDeep(actions)
    }
  },

  /**
   * Executes a task. **microTask** converts a task in a **list of actions** using promises.
   * Each action can be resolved or rejected.
   *
   * @param {*} actions Action list if `actions` is an array. Task list name if `action` is a string.
   * @param {object} [payload={}] Payload of the actions. This is an object shared by all actions in the task.
   * Is the javascript execution context of `action.method`. Inside `action.method`, `this.foo` is the same than `payload.foo`.
   * See [action parser](./action.md#parser).
   * @returns {promise} Returns an initialized promise
   * @example
   * microTasks.contextSet('shop.db.conection', {
   *   host: '123.45.678.90',
   *   user: 'root',
   *   password: 'a1b2c3d4'
   * })
   *
   * // run task with array of actions
   * microTasks.taskRun([
   *   {
   *     method: 'mysql.query',
   *     params: {
   *       query: 'SELECT * FROM shop.users WHERE email='{{payload.email}}' AND password={{payload.password}}',
   *            // SELECT * FROM shop.users WHERE email='info@migueldelmazo.com' AND password='12345678'
   *       connection: '{context.shop.db.conection}'
   *            // { host: '123.45.678.90', user: 'root', password: 'a1b2c3d4' }
   *     }
   *   }
   * ], {
   *   email: 'info@migueldelmazo.com',
   *   password: '12345678'
   * })
   *
   * // run task with a registered task list
   * microTasks.taskRun('getUserEmailFromDb', {
   *   email: 'info@migueldelmazo.com',
   *   password: '12345678'
   * })
   */
  taskRun (actions, payload = {}) {
    if (_.isArray(actions)) {
      payload = taskParsePayload(actions, payload)
      return taskGetPromise(payload)
    } else if (_.isString(actions) && _.isArray(tasks[actions])) {
      actions = tasks[actions]
      payload = taskParsePayload(actions, payload)
      return taskGetPromise(payload)
    } else {
      module.exports.hookRun('logger.error', {
        method: 'taskRun',
        message: 'invalid task',
        args: { actions, payload }
      })
    }
  }

}

global.onerror = (...args) => {
  module.exports.hookRun('logger.error', {
    method: 'globalOnError',
    args
  })
}
