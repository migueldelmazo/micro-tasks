## Modules

<dl>
<dt><a href="#module_logger">logger</a></dt>
<dd><p>Registers the actions, contexts, hooks and methods of the module <strong>logger</strong> in <a href="#module_microTasks">microTasks</a>.</p>
</dd>
<dt><a href="#module_mysql">mysql</a></dt>
<dd><p>Registers the actions, contexts, hooks and methods of the module <strong>mySQL</strong> in <a href="#module_microTasks">microTasks</a>.</p>
</dd>
<dt><a href="#module_microTasks">microTasks</a></dt>
<dd><p><strong>microTasks</strong> is a tool to execute a task (list of actions) with <strong>declarative programming</strong>.</p>
</dd>
</dl>

<a name="module_logger"></a>

## logger
Registers the actions, contexts, hooks and methods of the module **logger** in [microTasks](#module_microTasks).


* [logger](#module_logger)
    * [~hook list registered](#module_logger..hook list registered)
    * [~logger.error([arguments])](#module_logger..logger.error)
    * [~logger.log([arguments])](#module_logger..logger.log)

<a name="module_logger..hook list registered"></a>

### logger~hook list registered

| Name | Type | Description |
| --- | --- | --- |
| logger.error | <code>method</code> | Executes `logger.error` method |
| logger.log | <code>method</code> | Executes `logger.log` method |

<a name="module_logger..logger.error"></a>

### logger~logger.error([arguments])
Prints in console an error


| Name | Type | Description |
| --- | --- | --- |
| [arguments] | <code>\*</code> | Arguments to log |

**Example**  
```js
microTasks.methodRun('logger.error', 'this is', 'an error')
```
<a name="module_logger..logger.log"></a>

### logger~logger.log([arguments])
Prints in console a log


| Name | Type | Description |
| --- | --- | --- |
| [arguments] | <code>\*</code> | Arguments to log |

**Example**  
```js
microTasks.methodRun('logger.log', 'this is', 'an log')
```
<a name="module_mysql"></a>

## mysql
Registers the actions, contexts, hooks and methods of the module **mySQL** in [microTasks](#module_microTasks).


* [mysql](#module_mysql)
    * [~actions registered](#module_mysql..actions registered)
    * [~context items registered](#module_mysql..context items registered)
    * [~mysql.query(data)](#module_mysql..mysql.query)

<a name="module_mysql..actions registered"></a>

### mysql~actions registered

| Name | Type | Description |
| --- | --- | --- |
| mysql.query | <code>method</code> | Executes `mysql.query` method |

<a name="module_mysql..context items registered"></a>

### mysql~context items registered

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mysql.connection.database | <code>string</code> |  | Connection data base name |
| mysql.connection.debug | <code>boolean</code> | <code>false</code> | Connection debug mode |
| mysql.connection.host | <code>string</code> |  | Connection host |
| mysql.connection.password | <code>string</code> |  | Connection password |
| mysql.connection.port | <code>number</code> | <code>3306</code> | Connection port |
| mysql.connection.user | <code>string</code> |  | Connection user |

<a name="module_mysql..mysql.query"></a>

### mysql~mysql.query(data)
Executes a mysql query and returns the response.


| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>object</code> | <code>{}</code> | query configuration |
| data.query | <code>string</code> |  | mySQL query |
| [data.connection] | <code>object</code> | <code>{}</code> | Connection configuration. This object extends from `context.mysql.connection` |
| [data.handler] | <code>string</code> | <code>&quot;rows&quot;</code> | Response handler, it can be `field` (value), `row` (object) or `rows` (array of objects) |

**Example**  
```js
microTasks.actionRegister({
 method: 'mysql.query',
 params: {
   connection: {
     host: '127.0.0.1',
     user: 'db_user',
     password: 'db_pass'
   },
   query: 'SELECT email FROM db_name.users WHERE id=123 LIMIT 1',
   handler: 'field' // returns user email as a value
 })
```
<a name="module_microTasks"></a>

## microTasks
**microTasks** is a tool to execute a task (list of actions) with **declarative programming**.


* [microTasks](#module_microTasks)
    * [.actionRegister(action)](#module_microTasks.actionRegister)
    * [.contextGet(key, defaultValue)](#module_microTasks.contextGet) ⇒ <code>\*</code>
    * [.contextSet(key, value)](#module_microTasks.contextSet)
    * [.hookRegister(hookName, methodName)](#module_microTasks.hookRegister)
    * [.hookRun(hookName, [arguments])](#module_microTasks.hookRun)
    * [.logConfig()](#module_microTasks.logConfig)
    * [.methodRegister(methodName, method)](#module_microTasks.methodRegister)
    * [.methodRun(methodName, [arguments])](#module_microTasks.methodRun)
    * [.reject([data])](#module_microTasks.reject) ⇒ <code>promise</code>
    * [.taskRun(actions, [action], [payload])](#module_microTasks.taskRun) ⇒ <code>promise</code>

<a name="module_microTasks.actionRegister"></a>

### microTasks.actionRegister(action)
Register a action in microTasks.


| Name | Type | Default | Description |
| --- | --- | --- | --- |
| action | <code>object</code> |  | Task configuration |
| action.method | <code>string</code> |  | Method that is executed when running the action. **IMPORTANT:** if `action.method` is asynchronous it has to return a promise |
| [action.params] | <code>\*</code> | <code>[]</code> | List of parameters for the `action.method`. If it is not an array, it is wrapped in an array |
| [action.if] | <code>object</code> |  | If the `if` property exists, the `action.method` is only executed if the condition pass |
| [action.if.method] | <code>string</code> |  | This method validates if the `taks.method` must be executed |
| [action.if.params] | <code>\*</code> |  | List of parameters for the `action.if.method` |
| [action.if.equalTo] | <code>\*</code> |  | The result of `action.if.method` has to be equal than `action.if.equalTo` to pass the condition |
| [action.resultPath] | <code>string</code> |  | If it exists, the return value of the `action.method` is set on the `payload.resultPath` |
| [action.catch] | <code>boolean</code> | <code>false</code> | Specifies that this action captures errors from previous actions. `false` by default |

**Example**  
```js
microTasks.actionRegister({
   if: { // check if payload.email is a valid email
     method: 'validate.isEmail',
     params: '{{payload.email}}'
   },
   method: 'request.send',  // send a request
   params: {
     body: { // request post data: https://api.github.com/user/login
       email: '{{payload.email}}',
       password: '{{payload.password}}',
       role: 'user'
     },
     hostname: 'api.github.com', // request turl: https://api.github.com/user/login
     path: 'user/login'
     protocol: 'https',
     method: 'POST'
   },
   resultPath: 'userModel' // set the response in payload.userModel
})
```
<a name="module_microTasks.contextGet"></a>

### microTasks.contextGet(key, defaultValue) ⇒ <code>\*</code>
**Returns**: <code>\*</code> - Returns a context item  

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Item key |
| defaultValue | <code>\*</code> | Returned value if `context[key]` is `undefined` |

**Example**  
```js
microTasks.contextGet('undefined_key') // undefined
microTasks.contextGet('undefined_key', 123) // 123
microTasks.contextSet('gravity', 9.8)
microTasks.contextGet('gravity') // 9.8
```
<a name="module_microTasks.contextSet"></a>

### microTasks.contextSet(key, value)
Set an item into microTasks context.
It is useful for setting values that can be used by the actions and in the methods.
Each item can be overwritten as many times as you want.


| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Item key |
| value | <code>\*</code> | Item value |

**Example**  
```js
microTasks.contextSet('gravity', 9.8)
microTasks.contextGet('gravity') // 9.8
microTasks.contextSet('gravity', 9.80665)
microTasks.contextGet('gravity') // 9.80665
```
<a name="module_microTasks.hookRegister"></a>

### microTasks.hookRegister(hookName, methodName)
Register a hook in microTasks.
It is useful to intercept the flow of the program. The hook method is executed when an event happens.
The hook method has previously been [registered](methodRegister).

**Hooks**: `logger.error`, `logger.log`  

| Name | Type | Description |
| --- | --- | --- |
| hookName | <code>string</code> | Hook name |
| methodName | <code>string</code> | Method name that has previously been registered |

**Example**  
```js
microTasks.hookRegister('logger.log', 'logger.log')
```
<a name="module_microTasks.hookRun"></a>

### microTasks.hookRun(hookName, [arguments])
Executes a hook.
The hook method has previously been [registered](methodRegister).


| Name | Type | Description |
| --- | --- | --- |
| hookName | <code>string</code> | Hook name |
| [arguments] | <code>\*</code> | Hook arguments |

**Example**  
```js
hookRun('logger.log', 'name', user.name, 'email', user.email)
```
<a name="module_microTasks.logConfig"></a>

### microTasks.logConfig()
Executes `logger.log` hook with microTask configuration: `actions` and `context`, `hooks` and `methods`.

**Example**  
```js
microTasks.logConfig() // config { actions: {...}, context: {...}, hooks: {...}, methods: {...} }
```
<a name="module_microTasks.methodRegister"></a>

### microTasks.methodRegister(methodName, method)
Register a method in microTasks to be executed by actions and hooks.


| Name | Type | Description |
| --- | --- | --- |
| methodName | <code>string</code> | Method name |
| method | <code>function</code> | Method function |

**Example**  
```js
microTasks.methodRegister('request.send', (endpoint) => { ... })
microTasks.methodRegister('request.send', function (endpoint) { ... })
```
<a name="module_microTasks.methodRun"></a>

### microTasks.methodRun(methodName, [arguments])
Executes a method that has previously been [registered](methodRegister).


| Name | Type | Description |
| --- | --- | --- |
| methodName | <code>string</code> | Method name |
| [arguments] | <code>\*</code> | Method arguments |

**Example**  
```js
microTasks.methodRun('request.send', { method: 'GET', protocol: 'https', hostname: 'github.com' })
```
<a name="module_microTasks.reject"></a>

### microTasks.reject([data]) ⇒ <code>promise</code>
**Returns**: <code>promise</code> - Rejects a promise with data. Useful for reject actions.  

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>\*</code> | <code>{}</code> | Data with which the promise is rejected. |

**Example**  
```js
return microTasks.reject({ errorCode: 'not_found', errorStatus: 404 })
```
<a name="module_microTasks.taskRun"></a>

### microTasks.taskRun(actions, [action], [payload]) ⇒ <code>promise</code>
Executes a task. **microTask** converts a task in a **list of actions** in using promises.
Each action can be resolved or rejected.

**IMPORTANT:** before executing each action, microTask **parse the parameters**
and replace the values between braces `{{...}}` `{...}` with `context` and `payload` values.

- To replace a string use double braces: `'I am {{payload.userAge}} years old'` => `'I am 18 years old' // as string`
- To replace a value or object use single braces: `'{payload.userAge}'` => `18 // as number`
- You can use as source the payload `'{payload.userAge}'` or the context `'{context.apiDbConnection}'`
- You can use dot notation if the value you want to use is a deep property of the context or payload, e.g.: `'{context.api.db.connection}'`
- Context is used as context of application
- Payload is used as context of current task

**Returns**: <code>promise</code> - Returns an initialized promise  

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | <code>array</code> |  | Action list |
| [action] | <code>object</code> | <code>{}</code> | Action configuration. Each action can have the same configuration defined [here](#microtasks-actionregister-action-). |
| [action[].name] | <code>string</code> |  | Name of the action. If there is a [registered action](actionRegister) with this name, this action is extended with the configuration of the registered action |
| [payload] | <code>object</code> | <code>{}</code> | Payload of the actions. This is an object shared by all actions in the task. Is the javascript execution context of `action.method`. Inside `action.method`, `this.foo` is the same than `payload.foo` |

**Example**  
```js
microTasks.contextSet('shop.db.conection', {
   host: '123.45.678.90',
   user: 'root',
   password: 'a1b2c3d4'
 })

microTasks.taskRun([
 {
   method: 'mysql.query',
   params: {
     query: 'SELECT * FROM shop.users WHERE email='{{payload.email}}' AND password={{payload.password}}',
          // SELECT * FROM shop.users WHERE email='info@migueldelmazo.com' AND password='12345678'
     connection: '{context.shop.db.conection}'
          // { host: '123.45.678.90', user: 'root', password: 'a1b2c3d4' }
   }
 }
], {
 email: 'info@migueldelmazo.com',
 password: '12345678'
})
```
