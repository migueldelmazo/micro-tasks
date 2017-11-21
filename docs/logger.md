<a name="module_logger"></a>

## logger
Registers the actions, contexts, hooks and methods of the module **logger** in microTasks.


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
