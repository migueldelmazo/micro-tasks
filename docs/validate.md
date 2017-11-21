<a name="module_validate"></a>

## validate
Registers the actions, contexts, hooks and methods of the module **validate** in microTasks.


* [validate](#module_validate)
    * [~context items registered](#module_validate..context items registered)
    * [~validate.isArray(value)](#module_validate..validate.isArray) ⇒ <code>boolean</code>
    * [~validate.isEmail(value)](#module_validate..validate.isEmail) ⇒ <code>boolean</code>
    * [~validate.isEmpty(value)](#module_validate..validate.isEmpty) ⇒ <code>boolean</code>
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

<a name="module_validate..context items registered"></a>

### validate~context items registered

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
microTasks.actionRegister({ method: 'validate.isArray', params: '{payload.userList}' })
```
<a name="module_validate..validate.isEmail"></a>

### validate~validate.isEmail(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is an email.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Email value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isEmail', params: '{payload.userEmail}' })
```
<a name="module_validate..validate.isEmpty"></a>

### validate~validate.isEmpty(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is empty.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isEmpty', params: '{payload.userEmail}' })
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
microTasks.actionRegister({ method: 'validate.isGreatThan', params: ['{payload.userAge}', 18] })
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
microTasks.actionRegister({ method: 'validate.isGreatThanOrEqualTo', params: ['{payload.userAge}', 18] })
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
microTasks.actionRegister({ method: 'validate.isLessThan', params: ['{payload.userAge}', 18] })
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
microTasks.actionRegister({ method: 'validate.isLessThanOrEqualTo', params: ['{payload.userAge}', 18] })
```
<a name="module_validate..validate.isNotEmpty"></a>

### validate~validate.isNotEmpty(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is not empty.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isNotEmpty', params: '{payload.userEmail}' })
```
<a name="module_validate..validate.isNull"></a>

### validate~validate.isNull(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is NULL.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isNull', params: '{payload.userAge}' })
```
<a name="module_validate..validate.isNumber"></a>

### validate~validate.isNumber(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is a number.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isNumber', params: '{payload.userAge}' })
```
<a name="module_validate..validate.isPlainObject"></a>

### validate~validate.isPlainObject(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is a plain object.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isPlainObject', params: '{payload.user}' })
```
<a name="module_validate..validate.isString"></a>

### validate~validate.isString(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is a string.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isString', params: '{payload.userEmail}' })
```
<a name="module_validate..validate.isUndefined"></a>

### validate~validate.isUndefined(value) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is UNDEFINED.  

| Name | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value |

**Example**  
```js
microTasks.actionRegister({ method: 'validate.isUndefined', params: '{payload.userEmail}' })
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
microTasks.actionRegister({ method: 'validate.isNumber', params: '{payload.userAge}' })
```
