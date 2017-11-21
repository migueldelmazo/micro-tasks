/**
 * @module microTasks
 * @desc **microTasks** is a tool to execute a task (list of actions) with **declarative programming**.
 */
const _ = require('./lodash'),

  actions = {},
  context = {},
  hooks = {},
  methods = {},

  // task: promise handlers

  taskGetPromise = (actions, payload) => {
    return actionGetPromise(actions, payload)
      .catch(taskCatch.bind(null, payload))
      .then(taskThen.bind(null, payload))
  },

  // actions: promise handlers

  actionGetPromise = (actions, payload) => {
    let promise = module.exports.resolve()
    _.each(actions, (action) => {
      promise = action.catch
        ? promise.catch(actionCatch.bind(null, action, payload))
        : promise.then(actionThen.bind(null, action, payload))
    })
    return promise
  },

  actionCatch = (action, payload, err) => {
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
      })
  },

  actionThen = (action, payload) => {
    return module.exports.resolve()
      .then(() => {
        actionSetTimer(action, 'start')
        actionSetStatus(action, 'checking condition')
        if (actionIsConditional(action)) {
          return actionRun(action.if, payload)
        }
      })
      .then((result) => {
        if (actionIsConditional(action)) {
          actionSetConditionResult(action, result)
        }
        if (actionHasConditionPassed(action)) {
          actionSetStatus(action, 'solving')
          if (actionHasSubactions(action)) {
            return actionGetPromise(action.actions, payload)
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
        actionLog(action)
      })
      .catch((err) => {
        actionSetRejectedError(action, payload, err)
        actionSetResult(action, payload, err)
        actionSetStatus(action, 'error')
        actionSetTimer(action, 'end')
        actionLog(action)
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

  actionIsConditional = (action) => {
    return _.isPlainObject(action.if)
  },

  actionLog = (action) => {
    module.exports.hookRun('logger.log', 'onEndAction', action)
  },

  actionRun = (action, payload) => {
    action.parsedParams = _.compileData(_.parseArray(action.params), { payload, context })
    return module.exports.methodRun.call(payload, action.method, ...action.parsedParams)
  },

  actionSetRejectedError = (action, payload, err) => {
    action.error = err
    if (_.isError(err)) {
      payload.__errors = _.parseArray(payload.__errors)
      payload.__errors.push(err)
    }
  },

  actionSetConditionResult = (action, result) => {
    action.if.resultValue = result
  },

  actionSetResult = (action, payload, result) => {
    if (action.resultPath) {
      result = _.isError(result) ? result : _.cloneDeep(result)
      payload[action.resultPath] = result
      action[action.resultPath] = result
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

  taskCatch = (payload, err) => {
    module.exports.hookRun('logger.error', 'onTaskCatch', 'promise unhandled error', payload, err)
  },

  taskThen = (payload) => {
    module.exports.hookRun('logger.log', 'onTaskThen', payload)
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
    return payload
  },

  taskParseActions = (actions) => {
    return _.map(_.cloneDeep(actions), (action) => {
      return _.isEmpty(actions[action.name]) ? action : _.defaults(action, actions[action.name])
    })
  }

module.exports = {

  /**
   * Register a action in microTasks.
   * @param {object} action Task configuration
   * @param {string} action.method Method that is executed when running the action. **IMPORTANT:** if `action.method` is asynchronous it has to return a promise
   * @param {*} [action.params=[]] List of parameters for the `action.method`. If it is not an array, it is wrapped in an array
   * @param {object} [action.if] If the `if` property exists, the `action.method` is only executed if the condition pass
   * @param {string} [action.if.method] This method validates if the `taks.method` must be executed
   * @param {*} [action.if.params] List of parameters for the `action.if.method`
   * @param {*} [action.if.equalTo] The result of `action.if.method` has to be equal than `action.if.equalTo` to pass the condition
   * @param {string} [action.resultPath] If it exists, the return value of the `action.method` is set on the `payload.resultPath`
   * @param {boolean} [action.catch=false] Specifies that this action captures errors from previous actions. `false` by default
   * @example
   * microTasks.actionRegister({
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
  actionRegister (action) {
    if (_.isPlainObject(action) && _.isString(action.name)) {
      _.set(actions, action.name, action)
    } else {
      module.exports.hookRun('logger.error', 'actionRegister: invalid action', action)
    }
  },

  /**
   * @param {string} key Item key
   * @param {*} defaultValue Returned value if `context[key]` is `undefined`
   * @returns {*} Returns a context item
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
   * It is useful to intercept the flow of the program. The hook method is executed when an event happens.
   * The hook method has previously been [registered]{@link methodRegister}.
   * @param {string} hookName Hook name
   * @param {string} methodName Method name that has previously been registered
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
   * Executes `logger.log` hook with microTask configuration: `actions` and `context`, `hooks` and `methods`.
   * @example
   * microTasks.logConfig() // config { actions: {...}, context: {...}, hooks: {...}, methods: {...} }
   */
  logConfig () {
    module.exports.hookRun('logger.log', 'config', { actions, context, hooks, methods })
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
   * Executes a task. **microTask** converts a task in a **list of actions** in using promises.
   * Each action can be resolved or rejected.
   *
   * **IMPORTANT:** before executing each action, microTask **parse the parameters**
   * and replace the values between braces `{{...}}` `{...}` with `context` and `payload` values.
   *
   * - To replace a string use double braces: `'I am {{payload.userAge}} years old'` => `'I am 18 years old' // as string`
   * - To replace a value or object use single braces: `'{payload.userAge}'` => `18 // as number`
   * - You can use as source the payload `'{payload.userAge}'` or the context `'{context.apiDbConnection}'`
   * - You can use dot notation if the value you want to use is a deep property of the context or payload, e.g.: `'{context.api.db.connection}'`
   * - Context is used as context of application
   * - Payload is used as context of current task
   *
   * @param {array} actions Action list
   * @param {object} [action={}] Action configuration. Each action can have the same configuration defined [here]{@link #microtasks-actionregister-action-}.
   * @param {string} [action[].name] Name of the action.
   * If there is a [registered action]{@link actionRegister} with this name, this action is extended with the configuration of the registered action
   * @param {object} [payload={}] Payload of the actions. This is an object shared by all actions in the task.
   * Is the javascript execution context of `action.method`. Inside `action.method`, `this.foo` is the same than `payload.foo`
   * @returns {promise} Returns an initialized promise
   * @example
   * microTasks.contextSet('shop.db.conection', {
   *    host: '123.45.678.90',
   *    user: 'root',
   *    password: 'a1b2c3d4'
   *  })
   *
   * microTasks.taskRun([
   *  {
   *    method: 'mysql.query',
   *    params: {
   *      query: 'SELECT * FROM shop.users WHERE email='{{payload.email}}' AND password={{payload.password}}',
   *           // SELECT * FROM shop.users WHERE email='info@migueldelmazo.com' AND password='12345678'
   *      connection: '{context.shop.db.conection}'
   *           // { host: '123.45.678.90', user: 'root', password: 'a1b2c3d4' }
   *    }
   *  }
   * ], {
   *  email: 'info@migueldelmazo.com',
   *  password: '12345678'
   * })
   */
  taskRun (actions, payload = {}) {
    payload = taskParsePayload(actions, payload)
    return taskGetPromise(payload.__actions, payload)
  }

}
