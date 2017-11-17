/**
 * @module microTasks
 * @desc **microTasks** is a tool to execute a task (list of actions) with **declarative programming**.
 */
const _ = require('./lodash'),

  actions = {},
  context = {},
  hooks = {},
  methods = {},

  // task: action handlers

  taskGetPromise = (payload) => {
    let promise = new Promise((resolve) => resolve())
    _.each(payload.__actions, (action) => {
      if (action.catch) {
        promise = promise.catch(actionCatchStart.bind(null, payload, action))
        promise = promise.then(actionCatchEnd.bind(null, payload, action))
      } else {
        promise = promise.then(actionThenIf.bind(null, payload, action))
        promise = promise.then(actionThenStart.bind(null, payload, action))
        promise = promise.then(actionThenEnd.bind(null, payload, action))
      }
    })
    promise = promise.catch(taskPromiseCatch.bind(null, payload))
    promise = promise.then(taskPromiseThen.bind(null, payload))
    return promise
  },

  taskPromiseCatch = (payload, err) => {
    actionSetRejectedError(payload, err)
    actionSetStatus(payload, 'error')
    actionSetCurrent(payload)
    module.exports.hookRun('logger.error', 'taskPromiseCatch: promise unhandled error', payload, err)
  },

  taskPromiseThen = (payload) => {
    module.exports.hookRun('logger.log', payload)
  },

  // promise: action handlers

  actionCatchStart = (payload, action, result) => {
    actionSetRejectedError(payload, result)
    actionSetResult(payload, result)
    actionSetStatus(payload, 'rejected')
    actionSetCurrent(payload, action)
    actionSetStatus(payload, 'solving')
    return actionRun(payload, payload.__actions.current)
  },

  actionCatchEnd = (payload, action, result) => {
    if (actionIsCurrent(payload, action)) {
      actionSetResult(payload, result)
      actionSetStatus(payload, 'solved')
      actionSetCurrent(payload)
    }
  },

  actionThenIf = (payload, action) => {
    actionSetCurrent(payload, action)
    actionSetStatus(payload, 'checking condition')
    if (actionIsConditionalAction(payload)) {
      return actionRun(payload, payload.__actions.current.if)
    }
  },

  actionThenStart = (payload, action, conditionResult) => {
    if (actionIsConditionalAction(payload)) {
      actionSetConditionResult(payload, conditionResult)
    }
    if (actionHasConditionPassed(payload)) {
      actionSetStatus(payload, 'solving')
      return actionRun(payload, payload.__actions.current)
    }
  },

  actionThenEnd = (payload, action, result) => {
    if (actionIsCurrent(payload, action)) {
      if (actionHasConditionPassed(payload)) {
        actionSetResult(payload, result)
        actionSetStatus(payload, 'solved')
      } else {
        actionSetStatus(payload, 'ignored')
      }
      actionSetCurrent(payload)
    } else {
      // question: why I check actionIsCurrent in this method
      /* eslint no-debugger: 0 */
      debugger
    }
  },

  // actions helpers

  actionHasConditionPassed = (payload) => {
    return (actionIsConditionalAction(payload))
      ? _.isEqual(payload.__actions.current.if.result, payload.__actions.current.if.equalTo)
      : true
  },

  actionIsConditionalAction = (payload) => {
    return _.isPlainObject(payload.__actions.current.if)
  },

  actionIsCurrent = (payload, action) => {
    return payload.__actions.current === action
  },

  actionRun = (payload, data) => {
    data.parsedParams = _.compileData(_.parseArray(data.params), { payload, context })
    return module.exports.methodRun.call(payload, data.method, ...data.parsedParams)
  },

  actionSetConditionResult = (payload, result) => {
    _.set(payload, '__actions.current.if.result', result)
  },

  actionSetCurrent = (payload, action) => {
    payload.__actions.current = action
  },

  actionSetStatus = (payload, status) => {
    payload.__actions.current.status = status
  },

  actionSetRejectedError = (payload, err) => {
    if (_.isError(err)) {
      payload.__actions.errors = _.parseArray(payload.__actions.errors)
      payload.__actions.errors.push({
        taskIndex: _.findIndex(payload.__actions, payload.__actions.current),
        error: err
      })
    }
  },

  actionSetResult = (payload, result) => {
    if (payload.__actions.current.resultPath) {
      result = _.cloneDeep(result)
      _.set(payload, '__actions.current.resultValue', result)
      _.set(payload, payload.__actions.current.resultPath, result)
    }
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
   * @param {object} [action.if] If the `if` property exists, the `action.method` is only executed if the `actions.if.method` returns true
   * @param {string} [action.if.method] This method validates if the `taks.method` must be executed
   * @param {*} [action.if.params] List of parameters for the `action.if.method`
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
   * return microTasks.reject({ errorCode: 'not_found', errorStatus: 404 })
   */
  reject (data) {
    return new Promise((resolve, reject) => reject(data))
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
    return taskGetPromise(taskParsePayload(actions, payload))
  }

}
