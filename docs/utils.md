<a name="module_utils"></a>

## utils
Registers the actions, contexts, hooks and methods of the module **utils** in microTasks.


* [utils](#module_utils)
    * [~actions registered](#module_utils..actions registered)
    * [~utils.copy(definition)](#module_utils..utils.copy)
    * [~utils.set(to, from)](#module_utils..utils.set)

<a name="module_utils..actions registered"></a>

### utils~actions registered

| Name | Type | Description |
| --- | --- | --- |
| utils.copy | <code>method</code> | Executes `utils.copy` method |
| utils.set | <code>method</code> | Executes `utils.set` method |

<a name="module_utils..utils.copy"></a>

### utils~utils.copy(definition)
Copy a list of values from and to payload.


| Name | Type | Default | Description |
| --- | --- | --- | --- |
| definition | <code>object</code> | <code>{}</code> | `to: from` object list |

**Example**  
```js
microTasks.taskRun([
  {
    method: 'utils.copy',
    params: { 'newUserId': 'user.id', 'newUserAge': 'user.email' },
  }
],
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
microTasks.actionRegister({
  method: 'utils.set',
  params: ['isValidEmail', true] // payload.isValidEmail = true
})

microTasks.actionRegister({
  method: 'utils.set',
  params: ['userEmail', '{requestData.queryParams.email}'] // payload.userEmail = 'info@migueldelmazo.com'
})
```
