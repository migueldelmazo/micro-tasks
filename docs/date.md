<a name="module_date"></a>

## date
Registers the methods of the module **date** in microTasks.


* [date](#module_date)
    * [~date.getDate()](#module_date..date.getDate) ⇒ <code>boolean</code>
    * [~date.getNow()](#module_date..date.getNow) ⇒ <code>boolean</code>
    * [~date.isLaterThanNow(date)](#module_date..date.isLaterThanNow) ⇒ <code>boolean</code>
    * [~date.isBeforeThanNow(date)](#module_date..date.isBeforeThanNow) ⇒ <code>boolean</code>
    * [~date.toDate(date)](#module_date..date.toDate)
    * [~date.toMidnight(date)](#module_date..date.toMidnight)
    * [~date.toTimestamp(date)](#module_date..date.toTimestamp)

<a name="module_date..date.getDate"></a>

### date~date.getDate() ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns current date.  
**Example**  
```js
microTasks.taskRun([{
  method: 'date.getDate',
  resultPath: 'now'
}])
// payload.now = Tue Dec 19 2017 16:24:44 GMT+0100 (CET)
```
<a name="module_date..date.getNow"></a>

### date~date.getNow() ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns now date timestamp.  
**Example**  
```js
microTasks.taskRun([{
  method: 'date.getNow',
  resultPath: 'now'
}])
// payload.now = 1511284457000
```
<a name="module_date..date.isLaterThanNow"></a>

### date~date.isLaterThanNow(date) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is later than now.  

| Name | Type | Description |
| --- | --- | --- |
| date | <code>date</code> | date to validate |

**Example**  
```js
microTasks.taskRun([{
  method: 'date.isLaterThanNow',
  params: 1511284457000,
  resultPath: 'isLater'
}])
// payload.isLater = false
```
<a name="module_date..date.isBeforeThanNow"></a>

### date~date.isBeforeThanNow(date) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns if value is before now.  

| Name | Type | Description |
| --- | --- | --- |
| date | <code>date</code> | date to validate |

**Example**  
```js
microTasks.taskRun([{
  method: 'date.isBeforeThanNow',
  params: 1511284457000,
  resultPath: 'isBefore',
}])
// payload.isBefore = true
```
<a name="module_date..date.toDate"></a>

### date~date.toDate(date)
Parse a value to JavaScript Date object.


| Name | Type | Description |
| --- | --- | --- |
| date | <code>\*</code> | value to parse |

**Example**  
```js
microTasks.taskRun([{
  method: 'date.toDate',
  params: 'Tue Nov 21 2017 18:14:17 GMT+0100',
  resultPath: 'date'
}])
// payload.date = Tue Nov 21 2017 18:14:17 GMT+0100 (CET)
```
<a name="module_date..date.toMidnight"></a>

### date~date.toMidnight(date)
Returns a midnight of a date.


| Name | Type | Description |
| --- | --- | --- |
| date | <code>\*</code> | date |

**Example**  
```js
microTasks.taskRun([{
  method: 'date.toMidnight',
  params: 'Tue Nov 21 2017 18:14:17 GMT+0100',
  resultPath: 'date'
}])
// payload.date = 1511222400000
```
<a name="module_date..date.toTimestamp"></a>

### date~date.toTimestamp(date)
Parse a Date object to timestamp.


| Name | Type | Description |
| --- | --- | --- |
| date | <code>date</code> | date to parse |

**Example**  
```js
microTasks.taskRun([{
  method: 'date.toTimestamp',
  params: 'Tue Nov 21 2017 18:14:17 GMT+0100 (CET)',
  resultPath: 'timestamp'
}])
// payload.timestamp = 1511284457000
```
