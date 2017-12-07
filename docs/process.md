<a name="module_process"></a>

## process
Registers the methods of the module **process** in microTasks.

ToDo: Documentation

<a name="module_process..process.getMemoryUsage"></a>

### process~process.getMemoryUsage(unity) ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - Returns process memory usage.  

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| unity | <code>unity</code> | <code>b</code> | Unity of values: `b`, `kb`, `mb` or `tb` |

**Example**  
```js
microTasks.taskRun([{ method: 'validate.isArray', params: 'mg', resultPath: 'memory' }])
// payload.memory = { heapUsed: 60, heapTotal: 90, rss: 236 }
```
