<a name="module_request"></a>

## request
Registers the methods of the module **request** in microTasks.

<a name="module_request..request.send"></a>

### request~request.send(endopoint)
Send a request to a URI.


| Name | Type | Default | Description |
| --- | --- | --- | --- |
| endopoint | <code>object</code> | <code>{}</code> | Request configuration |
| [endopoint.body] | <code>object</code> | <code>{}</code> | Post body data |
| [endopoint.headers] | <code>object</code> | <code>{}</code> | Headers |
| [endopoint.hostname] | <code>string</code> |  | Hostname: e.g. mail.google.com |
| [endopoint.method] | <code>string</code> | <code>&quot;GET&quot;</code> | Method: GET, POST, PATCH... |
| [endopoint.path] | <code>string</code> | <code>&quot;/&quot;</code> | Path |
| [endopoint.protocol] | <code>string</code> | <code>&quot;https&quot;</code> | Protocol: https or http |
| [endopoint.port] | <code>string</code> |  | Port |

**Example**  
```js
microTasks.taskRun([{
  method: 'request.send',
  params: {
    body: { email: 'info@example.com', password: '12345678' },
    hostname: 'app.example.com',
    method: 'POST',
    path: 'user/login',
    protocol: 'https'
  }
}])
```
