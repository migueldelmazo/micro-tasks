<a name="module_validate"></a>

## validate
Registers the actions, contexts, hooks and methods of the module **validate** in microTasks.


* [validate](#module_validate)
    * [~context](#module_validate..context)
    * [~validate.isArray(value)](#module_validate..validate.isArray) ⇒ <code>boolean</code>
    * [~validate.isEmail(value)](#module_validate..validate.isEmail) ⇒ <code>boolean</code>
    * [~validate.isEmpty(value)](#module_validate..validate.isEmpty) ⇒ <code>boolean</code>
    * [~validate.isEqual(value, other)](#module_validate..validate.isEqual) ⇒ <code>boolean</code>
    * [~validate.isGreatThan(value, other)](#module_validate..validate.isGreatThan) ⇒ <code>boolean</code>
    * [~validate.isGreatThanOrEqualTo(value, other)](#module_validate..validate.isGreatThanOrEqualTo) ⇒ <code>boolean</code>
    * [~validate.isLessThan(value, other)](#module_validate..validate.isLessThan) ⇒ <code>boolean</code>
    * [~validate.isLessThanOrEqualTo(value, other)](#module_validate..validate.isLessThanOrEqualTo) ⇒ <code>boolean</code>
    * [~validate.isNotEmpty(value)](#module_validate..validate.isNotEmpty) ⇒ <code>boolean</code>
    * [~validate.isNull(value)](#module_validate..validate.isNull) ⇒ <code>boolean</code>
    * [~validate.isNumber(value)](#module_validate..validate.isNumber) ⇒ <code>boolean</code>
    * [~validate.isPlainObject(value)](#module_validate..validate.isPlainObject) ⇒ <code>boolean</code>
    * [~validate.isString(value)](#module_validate..validate.isString) ⇒ <code>boolean</code>
    * [~validate.isUndefined(value)](#module_validate..validate.isUndefined) ⇒ <code>boolean</code>
    * [~validate.validator(validator, error, [args])](#module_validate..validate.validator) ⇒ <code>promise</code>

<a name="module_validate..context"></a>

### validate~context
Context item list registered in microTasks.


| Name | Type | Description |
| --- | --- | --- |
| validate.regexEmail | <code>RegExp</code> | Email regular expresion |

<a name="module_validate..validate.isArray"></a>

### validate~validate.isArray(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is an array.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isArray', params: [[1, 2, 3]], resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isEmail"></a>

### validate~validate.isEmail(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is an email.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Email value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isEmail', params: 'info@migueldelmazo.com', resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isEmpty"></a>

### validate~validate.isEmpty(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is empty.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isEmpty', params: '', resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isEqual"></a>

### validate~validate.isEqual(value, other) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is equal than other.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |
| other | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isEqual', params: [1, 1], resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isGreatThan"></a>

### validate~validate.isGreatThan(value, other) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is great than other.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |
| other | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isGreatThan', params: [2, 1], resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isGreatThanOrEqualTo"></a>

### validate~validate.isGreatThanOrEqualTo(value, other) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is great than or equal to other.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |
| other | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isGreatThanOrEqualTo', params: [1, 1], resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isLessThan"></a>

### validate~validate.isLessThan(value, other) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is less than other.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |
| other | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isLessThan', params: [1, 2], resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isLessThanOrEqualTo"></a>

### validate~validate.isLessThanOrEqualTo(value, other) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is less than or equal to other.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |
| other | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isLessThanOrEqualTo', params: [1, 1], resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isNotEmpty"></a>

### validate~validate.isNotEmpty(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is not empty.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isNotEmpty', params: 'foo', resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isNull"></a>

### validate~validate.isNull(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is NULL.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isNull', params: [null], resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isNumber"></a>

### validate~validate.isNumber(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is a number.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isNumber', params: 1, resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isPlainObject"></a>

### validate~validate.isPlainObject(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is a plain object.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isPlainObject', params: { one: 1 }, resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isString"></a>

### validate~validate.isString(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is a string.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isString', params: 'foo', resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.isUndefined"></a>

### validate~validate.isUndefined(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is UNDEFINED.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isUndefined', params: undefined, resultPath: 'is' }])
// payload.is = true
```
<a name="module_validate..validate.validator"></a>

### validate~validate.validator(validator, error, [args]) ⇒ <code>promise</code>
**Returns**: <code>promise</code> - Returns a rejected promise if validator method returns `false` or a `rejected promise`.  

| Name | Type | Description |
| --- | --- | --- |
| validator | <code>string</code> | Validator method name |
| error | <code>\*</code> | Error with which the promise is rejected |
| [args] | <code>\*</code> | Other arguments |

**Example**  
```js
microTasks.taskRun([{
  method: 'validate.validator',
  params: ['validate.isNumber', 'It is not a number', 1]
}])
microTasks.taskRun([{
  method: 'validate.validator',
  params: ['validate.isNumber', 'It is not a number', '1']
}])
```
