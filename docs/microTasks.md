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
    * [.resolve([data])](#module_microTasks.resolve) ⇒ <code>promise</code>
    * [.taskRegister(taskName, actions)](#module_microTasks.taskRegister)
    * [.taskRun(actions, [payload])](#module_microTasks.taskRun) ⇒ <code>promise</code>

<a name="module_microTasks.actionRegister"></a>

### microTasks.actionRegister(action)
Register a action in microTasks.


| Name | Type | Description |
| --- | --- | --- |
| action | <code>object</code> | Task configuration. See [action configuration](./action.md#configuration). |

**Example**  
```js
microTasks.actionRegister({...})
```
<a name="module_microTasks.contextGet"></a>

### microTasks.contextGet(key, defaultValue) ⇒ <code>\*</code>
**Returns**: <code>\*</code> - Returns a context item.  

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
It is useful to intercept the flow of the task. The hook method is executed when an event happens.
The hook method has previously been registered.

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
The hook method has previously been registered.


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
Executes `logger.log` hook with microTask configuration: `actions` and `context`, `hooks` `methods` and `tasks`.

**Example**  
```js
microTasks.logConfig() // config { actions: {...}, context: {...}, hooks: {...}, methods: {...}, tasks: {...} }
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
Executes a method that has previously been registered.


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
return microTasks.reject({ status: 404 })
```
<a name="module_microTasks.resolve"></a>

### microTasks.resolve([data]) ⇒ <code>promise</code>
**Returns**: <code>promise</code> - Resolves a promise with data. Useful for resove actions.  

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>\*</code> | <code>{}</code> | Data with which the promise is resoved. |

**Example**  
```js
return microTasks.resolve({ status: 200 })
```
<a name="module_microTasks.taskRegister"></a>

### microTasks.taskRegister(taskName, actions)
Register a task list in microTasks.


| Name | Type | Description |
| --- | --- | --- |
| taskName | <code>string</code> | Task name |
| actions | <code>array</code> | Action list |

**Example**  
```js
microTasks.taskRegister('dbBackup', [])
```
<a name="module_microTasks.taskRun"></a>

### microTasks.taskRun(actions, [payload]) ⇒ <code>promise</code>
Executes a task. **microTask** converts a task in a **list of actions** using promises.
Each action can be resolved or rejected.

**Returns**: <code>promise</code> - Returns an initialized promise  

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | <code>\*</code> |  | Action list if `actions` is an array. Task list name if `action` is a string. |
| [payload] | <code>object</code> | <code>{}</code> | Payload of the actions. This is an object shared by all actions in the task. Is the javascript execution context of `action.method`. Inside `action.method`, `this.foo` is the same than `payload.foo`. See [action parser](./action.md#parser). |

**Example**  
```js
microTasks.contextSet('shop.db.conection', {
  host: '123.45.678.90',
  user: 'root',
  password: 'a1b2c3d4'
})

// run task with array of actions
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

// run task with a registered task list
microTasks.taskRun('getUserEmailFromDb', {
  email: 'info@migueldelmazo.com',
  password: '12345678'
})
```
