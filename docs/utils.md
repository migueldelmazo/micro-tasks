<a name="module_utils"></a>

## utils
Registers the methods of the module **utils** in microTasks.


* [utils](#module_utils)
    * [~utils.copy(definition)](#module_utils..utils.copy)
    * [~utils.set(to, from)](#module_utils..utils.set)
    * [~utils.wait(time)](#module_utils..utils.wait)
    * [~utils.default(key, defaultValue)](#module_utils..utils.default)

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
