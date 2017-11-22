<a name="module_date"></a>

## date
Registers the methods of the module **date** in microTasks.


* [date](#module_date)
    * [~date.isLaterThanNow(date)](#module_date..date.isLaterThanNow) ⇒ <code>boolean</code>
    * [~date.isBeforeThanNow(date)](#module_date..date.isBeforeThanNow) ⇒ <code>boolean</code>
    * [~date.toTimestamp(date)](#module_date..date.toTimestamp)

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
