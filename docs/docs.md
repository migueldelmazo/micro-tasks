<a name="module_microTasks"></a>

## microTasks
Microtasks is a tool to execute a list of tasks with declarative programming


* [microTasks](#module_microTasks)
    * [.contextGet(key, defaultValue)](#module_microTasks.contextGet) ⇒ <code>\*</code>
    * [.contextSet(key, value)](#module_microTasks.contextSet)
    * [.hookRegister(hookName, methodName)](#module_microTasks.hookRegister)
    * [.hookRun(hookName, [arguments])](#module_microTasks.hookRun)
    * [.logConfig()](#module_microTasks.logConfig)
    * [.methodRegister(methodName, method)](#module_microTasks.methodRegister)
    * [.methodRun(methodName, [arguments])](#module_microTasks.methodRun)
    * [.reject(data)](#module_microTasks.reject) ⇒ <code>promise</code>
    * [.taskRegister(task)](#module_microTasks.taskRegister)
    * [.tasksRun(tasks, [task], [payload])](#module_microTasks.tasksRun) ⇒ <code>promise</code>

<a name="module_microTasks.contextGet"></a>

### microTasks.contextGet(key, defaultValue) ⇒ <code>\*</code>
Returns a context item.


| Param | Type | Description |
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
It is useful for setting values that can be used by the tasks and in the methods.
Each item can be overwritten as many times as you want.


| Param | Type | Description |
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

| Param | Type | Description |
| --- | --- | --- |
| hookName | <code>string</code> | Hook name |
| methodName | <code>function</code> | Method name that has previously been registered |

**Example**  
```js
microTasks.hookRegister('logger.log', 'logger.log')
```
<a name="module_microTasks.hookRun"></a>

### microTasks.hookRun(hookName, [arguments])
Executes a hook.
The hook method has previously been [registered](methodRegister).


| Param | Type | Description |
| --- | --- | --- |
| hookName | <code>string</code> | Hook name |
| [arguments] | <code>\*</code> | Hook arguments |

**Example**  
```js
hookRun('logger.log', 'name', user.name, 'email', user.email)
```
<a name="module_microTasks.logConfig"></a>

### microTasks.logConfig()
Executes `logger.log` hook with microTask configuration: `context`, `hooks`, `methods` and `tasks`

**Example**  
```js
microTasks.logConfig()
```
<a name="module_microTasks.methodRegister"></a>

### microTasks.methodRegister(methodName, method)
Register a method in microTasks to be executed by tasks and hooks.


| Param | Type | Description |
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


| Param | Type | Description |
| --- | --- | --- |
| methodName | <code>string</code> | Method name |
| [arguments] | <code>\*</code> | Method arguments |

**Example**  
```js
microTasks.methodRun('request.send', { method: 'GET', protocol: 'https', hostname: 'github.com' })
```
<a name="module_microTasks.reject"></a>

### microTasks.reject(data) ⇒ <code>promise</code>
Rejects a task with data.

**Returns**: <code>promise</code> - Rejected promises  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | Data with which the task is rejected. Inside `task.method`, `this.foo` is the same than `payload.foo` |

**Example**  
```js
microTasks.reject({ errorCode: 'not_found', errorStatus: 404 })
```
<a name="module_microTasks.taskRegister"></a>

### microTasks.taskRegister(task)
Register a task in microTasks.


| Param | Type | Description |
| --- | --- | --- |
| task | <code>object</code> | Task configuration |
| task.method | <code>string</code> | Method that is executed when running the task. **IMPORTANT:** if `task.method` is asynchronous it has to return a promise |
| [task.params] | <code>\*</code> | List of parameters for the `task.method`. If it is not an array, it is wrapped in an array |
| [task.if] | <code>object</code> | If the `if` property exists, the `task.method` is only executed if the `tasks.if.method` returns true |
| [task.if.method] | <code>string</code> | This method validates if the `taks.method` must be executed |
| [task.if.params] | <code>\*</code> | List of parameters for the `task.if.method` |
| [task.resultPath] | <code>string</code> | If it exists, the return value of the `task.method` is set on the `payload.resultPath` |
| [task.catch] | <code>boolean</code> | Specifies that this task captures errors from previous tasks. `false` by default |

**Example**  
```js
microTasks.taskRegister({
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
<a name="module_microTasks.tasksRun"></a>

### microTasks.tasksRun(tasks, [task], [payload]) ⇒ <code>promise</code>
Executes a task list. microTask converts a list of tasks into a promise. Each task can be resolved or rejected.

**Returns**: <code>promise</code> - returns an initialized promise  

| Param | Type | Description |
| --- | --- | --- |
| tasks | <code>array</code> | Task list |
| [task] | <code>string</code> | Task configuration. Each task can have the same configuration defined [here](taskRegister). |
| [task[].name] | <code>string</code> | Name of the task. If there is a [registered task](taskRegister) with this name, this task is extended with the configuration of the registered task |
| [payload] | <code>object</code> | Payload of the tasks. This is an object shared by all tasks in the list. Is the javascript execution context of `task.method`. Inside `task.method`, `this.foo` is the same than `payload.foo` |

**Example**  
```js
microTasks.tasksRun([
 {
   name: 'request.send',
   method: 'request.send',
   params: {
     headers: { 'Content-Type': 'text/html' },
     hostname: 'github.com'
   }
 }
])
```
