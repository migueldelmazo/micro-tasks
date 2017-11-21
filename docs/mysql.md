<a name="module_mysql"></a>

## mysql
Registers the actions, contexts, hooks and methods of the module **mySQL** in microTasks.


* [mysql](#module_mysql)
    * [~actions registered](#module_mysql..actions registered)
    * [~context items registered](#module_mysql..context items registered)
    * [~mysql.query(data)](#module_mysql..mysql.query)

<a name="module_mysql..actions registered"></a>

### mysql~actions registered

| Name | Type | Description |
| --- | --- | --- |
| mysql.query | <code>method</code> | Executes `mysql.query` method |

<a name="module_mysql..context items registered"></a>

### mysql~context items registered

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mysql.connection.database | <code>string</code> |  | Connection data base name |
| mysql.connection.debug | <code>boolean</code> | <code>false</code> | Connection debug mode |
| mysql.connection.host | <code>string</code> |  | Connection host |
| mysql.connection.password | <code>string</code> |  | Connection password |
| mysql.connection.port | <code>number</code> | <code>3306</code> | Connection port |
| mysql.connection.user | <code>string</code> |  | Connection user |

<a name="module_mysql..mysql.query"></a>

### mysql~mysql.query(data)
Executes a mysql query and returns the response.


| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>object</code> | <code>{}</code> | query configuration |
| data.query | <code>string</code> |  | mySQL query |
| [data.connection] | <code>object</code> | <code>{}</code> | Connection configuration. This object extends from `context.mysql.connection` |
| [data.handler] | <code>string</code> | <code>&quot;rows&quot;</code> | Response handler, it can be `field` (value), `row` (object) or `rows` (array of objects) |

**Example**  
```js
microTasks.actionRegister({
  method: 'mysql.query',
  params: {
    connection: {
      host: '127.0.0.1',
      user: 'db_user',
      password: 'db_pass'
    },
    query: 'SELECT email FROM db_name.users WHERE id=123 LIMIT 1',
    handler: 'field' // returns user email as a value
  }
})
```