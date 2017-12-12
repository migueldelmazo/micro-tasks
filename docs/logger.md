<a name="module_logger"></a>

## logger
Registers the hooks and methods of the module **logger** in microTasks.


* [logger](#module_logger)
    * [~hooks](#module_logger..hooks)
    * [~logger.error([arguments])](#module_logger..logger.error)
    * [~logger.log([arguments])](#module_logger..logger.log)
    * [~logger.warn([arguments])](#module_logger..logger.warn)

<a name="module_logger..hooks"></a>

### logger~hooks
Hook list registered in microTask.


| Name | Type | Description |
| --- | --- | --- |
| logger.error | <code>method</code> | Executes `logger.error` method |
| logger.log | <code>method</code> | Executes `logger.log` method |
| logger.warn | <code>method</code> | Executes `logger.warn` method |
| microTasks.onActionEnd | <code>method</code> | Executes `logger.log` method |
| microTasks.onActionError | <code>method</code> | Executes `logger.error` method |
| microTasks.onActionRejected | <code>method</code> | Executes `logger.log` method |
| microTasks.onGlobalError | <code>method</code> | Executes `logger.error` method |
| microTasks.onTaskEnd | <code>method</code> | Executes `logger.log` method |
| microTasks.onTaskError | <code>method</code> | Executes `logger.error` method |
| microTasks.onTaskRejected | <code>method</code> | Executes `logger.log` method |
| microTasks.onTaskStart | <code>method</code> | Executes `logger.log` method |

<a name="module_logger..logger.error"></a>

### logger~logger.error([arguments])
Prints in console an error.


| Name | Type | Description |
| --- | --- | --- |
| [arguments] | <code>\*</code> | Arguments to log |

**Example**  
```js
microTasks.methodRun('logger.error', 'this is', 'an error')
```
<a name="module_logger..logger.log"></a>

### logger~logger.log([arguments])
Prints in console a log.


| Name | Type | Description |
| --- | --- | --- |
| [arguments] | <code>\*</code> | Arguments to log |

**Example**  
```js
microTasks.methodRun('logger.log', 'this is', 'an log')
```
<a name="module_logger..logger.warn"></a>

### logger~logger.warn([arguments])
Prints in console a warning.


| Name | Type | Description |
| --- | --- | --- |
| [arguments] | <code>\*</code> | Arguments to log |

**Example**  
```js
microTasks.methodRun('logger.warn', 'this is', 'a warning')
```
