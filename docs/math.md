<a name="module_math"></a>

## math
Registers the methods of the module **math** in microTasks.


* [math](#module_math)
    * [~math.add([Numbers])](#module_math..math.add) ⇒ <code>number</code>
    * [~math.divide([Numbers])](#module_math..math.divide) ⇒ <code>number</code>
    * [~math.multiply([Numbers])](#module_math..math.multiply) ⇒ <code>number</code>
    * [~math.operate(operation, [args])](#module_math..math.operate) ⇒ <code>number</code>
    * [~math.parseInt(operation, [args])](#module_math..math.parseInt) ⇒ <code>number</code>
    * [~math.substract([Numbers])](#module_math..math.substract) ⇒ <code>number</code>

<a name="module_math..math.add"></a>

### math~math.add([Numbers]) ⇒ <code>number</code>
**Returns**: <code>number</code> - Returns the sum of several numbers.

| Name | Type | Description |
| --- | --- | --- |
| [Numbers] | <code>number</code> | List of numbers. |

**Example**
```js
microTasks.taskRun([{
  method: 'math.add',
  params: [1, 2, 3],
  resultPath: 'total'
}])
// payload.total = 6
```
<a name="module_math..math.divide"></a>

### math~math.divide([Numbers]) ⇒ <code>number</code>
**Returns**: <code>number</code> - Returns the division of several numbers.

| Name | Type | Description |
| --- | --- | --- |
| [Numbers] | <code>number</code> | List of numbers. |

**Example**
```js
microTasks.taskRun([{
  method: 'math.divide',
  params: [24, 3, 2],
  resultPath: 'total'
}])
// payload.total = 4
```
<a name="module_math..math.multiply"></a>

### math~math.multiply([Numbers]) ⇒ <code>number</code>
**Returns**: <code>number</code> - Returns the multiplication of several numbers.

| Name | Type | Description |
| --- | --- | --- |
| [Numbers] | <code>number</code> | List of numbers. |

**Example**
```js
microTasks.taskRun([{
  method: 'math.multiply',
  params: [2, 3, 4],
  resultPath: 'total'
}])
// payload.total = 24
```
<a name="module_math..math.operate"></a>

### math~math.operate(operation, [args]) ⇒ <code>number</code>
**Returns**: <code>number</code> - Returns the result of a mathematical operation, using the native library Math.

| Name | Type | Description |
| --- | --- | --- |
| operation | <code>operation</code> | Numbers. |
| [args] | <code>args</code> | Arguments of the operation. |

**Example**
```js
microTasks.taskRun([{
  method: 'math.operate',
  params: [round, 1.1], // Math.round(1.1)
  resultPath: 'total'
}])
// payload.total = 1
```
<a name="module_math..math.substract"></a>

### math~math.parseInt(operation, [args]) ⇒ <code>number</code>
**Returns**: <code>number</code> - Returns the number parsed to integer.

| Name | Type | Description |
| --- | --- | --- |
| number | <code>number</code> | Numbers. |

**Example**
```js
microTasks.taskRun([{
  method: 'math.parseInt',
  params: 1.1, // parseInt(1.1)
  resultPath: 'total'
}])
// payload.total = 1
```
<a name="module_math..math.substract"></a>

### math~math.substract([Numbers]) ⇒ <code>number</code>
**Returns**: <code>number</code> - Returns the subtraction of several numbers.

| Name | Type | Description |
| --- | --- | --- |
| [Numbers] | <code>number</code> | List of numbers. |

**Example**
```js
microTasks.taskRun([{
  method: 'math.substract',
  params: [10, 3, 1],
  resultPath: 'total'
}])
// payload.total = 6
```
