<a name="module_utils"></a>

## utils
Registers the methods of the module **utils** in microTasks.


* [utils](#module_utils)
    * [~utils.copy(definition)](#module_utils..utils.copy)
    * [~utils.default(key, defaultValue)](#module_utils..utils.default)
    * [~utils.getTaskTime(payload)](#module_utils..utils.getTaskTime)
    * [~utils.replace(str, substr, replacement)](#module_utils..utils.replace)
    * [~utils.set(to, from)](#module_utils..utils.set)
    * [~utils.size(Value)](#module_utils..utils.size)
    * [~utils.wait(time)](#module_utils..utils.wait)

<a name="module_utils..utils.copy"></a>

### utils~utils.copy(definition)
Copy a list of values from and to payload.


| Name | Type | Default | Description |
| --- | --- | --- | --- |
| definition | <code>object</code> | <code>{}</code> | `to: from` object list |

**Example**  
```js
microTasks.taskRun([{
  method: 'utils.copy',
  params: { 'newUserId': 'user.id', 'newUserAge': 'user.age' }
}],
{
  user: { id: 123, age: 18 } // payload
})
// payload = { user: { id: 123, age: 18 }, newUserId: 123, newUserAge: 18 }
```
<a name="module_utils..utils.default"></a>

### utils~utils.default(key, defaultValue)
Set defaultValue if value is undefined


| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key to set |
| defaultValue | <code>\*</code> | Value to set |

**Example**  
```js
microTasks.taskRun([{
  method: 'utils.default',
  params: ['foo', 123]
}])
```
<a name="module_utils..utils.getTaskTime"></a>

### utils~utils.getTaskTime(payload)
Returns the processing time of a task


| Name | Type | Description |
| --- | --- | --- |
| payload | <code>object</code> | Payload of the task |

**Example**  
```js
microTasks.methodRun('utils.getTaskTime', payload)
// 145 milliseconds
```
<a name="module_utils..utils.replace"></a>

### utils~utils.replace(str, substr, replacement)
Returns a replaced string.


| Name | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Source string |
| substr | <code>string</code> | A string that is to be replaced by replacement |
| replacement | <code>string</code> | The String that replaces the substr |

**Example**  
```js
microTasks.taskRun([{
  method: 'utils.replace',
  params: ['foo', 'o', 'a'],
  resultPath: 'newString'
}])
// payload.newString = 'faa'
```
<a name="module_utils..utils.set"></a>

### utils~utils.set(to, from)
Set a value in payload.


| Name | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | destination path in payload |
| from | <code>\*</code> | source value in payload |

**Example**  
```js
microTasks.taskRun([{
  method: 'utils.set',
  params: ['foo', true]
}])
// payload.foo = true
```
<a name="module_utils..utils.size"></a>

### utils~utils.size(Value)
Returns the size of a value.


| Name | Type | Description |
| --- | --- | --- |
| Value | <code>\*</code> | value to get size |

**Example**  
```js
microTasks.taskRun([{
  method: 'utils.size',
  params: [[1, 2]],
  resultPath: 'size'
}])
// payload.size = 2
```
<a name="module_utils..utils.wait"></a>

### utils~utils.wait(time)
Wait for `time` milliseconds before resolving the action.


| Name | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | time to wait |

**Example**  
```js
microTasks.taskRun([{
  method: 'utils.wait',
  params: 10000 // 10 seconds
}])
```
