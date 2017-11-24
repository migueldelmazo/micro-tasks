# microTasks

Library to execute JSON task with [declarative programming](https://en.wikipedia.org/wiki/Declarative_programming).
It converts a JSON collection into a list of actions (asynchronous or not), executes them and returns the result.
It also efficiently manages possible errors.

- [How it does work?](#how-it-does-work-)
- [Basic concepts](#basic-concepts)
- [Debug](#debug)
- [Documentation](#documentation)
- [Libraries](#libraries)
- [Examples](#examples)
- [Setup and NPM scripts](#setup-and-npm-scripts)

## How it does work?

The next example JSON declares 5 actions that manage an ajax request to get the data of a user's shopping cart.
This task returns the products of the cart and the total price, or a 500 http error if there is a problem.

```javascript
microTasks.taskRun([
  {
    // get from mysql db the user id
    // and set it in 'payload.userId'
    method: 'mysql.query',
    params: {
      query: 'SELECT id FROM users WHERE email="{{payload.email}}"',
      handler: 'field'
    },
    resultPath: 'userId'
  },
  {
    // get from mysql db the units and prices of the product of the cart of this user
    // and set it in 'payload.cartProducts' as array
    method: 'mysql.query',
    params: {
      query: 'SELECT units, price FROM cart WHERE userId={{payload.userId}}',
      handler: 'rows'
    },
    resultPath: 'cartProducts'
  },
  {
    // map 'payload.cartProducts' multiplying units by price and set the result in totalByProduct property
    // and set it in 'payload.cartProducts'
    method: 'collection.mapByIterator',
    params: ['{payload.cartProducts}', 'math.multiply', 'totalByProduct', 'units', 'price'],
    resultPath: 'cartProducts'
  },
  {
    // reduce 'payload.cartProducts' adding totalByProduct
    // and set it in 'cartTotalPrice'
    method: 'collection.reduce',
    params: ['math.add', 'totalByProduct'],
    resultPath: 'cartTotalPrice'
  },
  {
    // response the ajax request with cartProducts, cartTotalPrice and status code
    method: 'request.response',
    params: {
      status: 200,
      cartTotalPrice: '{payload.cartTotalPrice}',
      cartProducts: '{payload.cartProducts}'
    }
  },
  {
    // response the ajax request with error
    catch: true,
    method: 'request.response',
    params: {
      status: 500,
      error: 'Internal error'
    }
  }
], {
  email: 'info@example.com'
})
```

Each action becomes a promise. Unknown errors can be managed with **catch** property.

The previous example would become something like:

```javascript
const payload = {}
new Promise((resolve) => resolve())
  .then(() => {
    return mysqlConnect()
  })
  .then(() => {
    return mysqlQuery('SELECT id FROM users WHERE email="info@example.com"')
  })
  .then((userId) => {
    payload.userId = userId
  })
  .then(() => {
    return mysqlQuery('SELECT units, price FROM cart WHERE userId=123')
  })
  .then((cartProducts) => {
    payload.cartProducts = cartProducts
  })
  .then(() => {
    payload.cartProducts = payload.cartProducts.map((cartProduct) => {
      cartProduct.totalByProduct = cartProduct.units * cartProduct.price
      return cartProduct
    })
  })
  .then(() => {
    payload.cartTotalPrice = payload.cartProducts.reduce((total, cartProduct) => {
      total += cartProduct.totalByProduct
    }, 0)
  })
  .then(() => {
    request.send({ cartTotalPrice: payload.cartTotalPrice, cartProducts: payload.cartProducts }).status(200)
  })
  .catch(() => {  
    request.send({ error: 'Internal error' }).status(500)
  })
```

## Basic concepts

- **Task:** it is an ordered list of actions, I mean, an array of objects.
- **Action:** define the execution of an action with a method, parameters and a property to set the return of the method.
I mean, a plain object.
An action can have a list of actions inside that, and then can be executed in **series**, **parallel** or in **race**.
You can also define **conditional actions**. With these options **you can create any flow** of actions.
For more info see [action configuration](./docs/action.md#configuration). This is an example:
```javascript
microTasks.taskRun([
    {
      method: 'mysql.query',
      params: { query: 'SELECT units, price FROM cart WHERE userId={{payload.userId}}' },
      resultPath: 'cartProducts'
    }
  ])
```
- **Method:** defines a method that can be executed from an action.
```javascript
microTasks.methodRegister('mysql.query', (data) => {
    return new Promise((resolve, reject) => {
      // connect
      const connection = mysql.createConnection(data.connection)
      connection.connect()
      // query
      connection.query(data.query, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
})
```
- **Payload:** object shared among all actions in a task.
To access a property of the payload from an action param, you can use `'{payload.user.id}'` to get the value
or `'The user id is {{payload.user.id}}'` to parse a string.
See [action parser](./docs/action.md#parser) for more info.
- **Context:** object shared among all tasks, is the application context.
Useful for saving global configuration, task status...
To access a property of the context you can use `'{context.mysql.connection.host}'` to get the value
or `'The db connection host is {{context.mysql.connection.host}}'` to parse a string.
See [action parser](./docs/action.md#parser).
- **Hooks:** to intercept the flow of tasks and actions you can register and listen hooks. See [registered hooks](./docs/logger.md#logger-hooks).
([What is a hook?](https://en.wikipedia.org/wiki/Hooking))

## Debug

To facilitate the debugging of tasks, each action logs:

- input parameters and parsed input parameters
- method result
- final status of the action: `checking condition` > `solving` > `solved`, `ignored`, `error` or `rejected`
- captured errors
- the execution time

This action logs next data ([example](./examples/debug-log.js)):
```javascript
microTasks.taskRun([{
  if: {
    method: 'conditionalAction',
    params: '{payload.myCondition}',
    equalTo: true
  },
  method: 'print',
  params: 'This action is executed because conditionalAction is ok'
}], {
  myCondition: true
})

/*
{  
  if: {  
    method: "conditionalAction",
    params: "{payload.myCondition}",
    parsedParams: [true],
    equalTo: true,
    resultValue: true
  },
  method: "print",
  params: "This action is executed because conditionalAction is ok",
  parsedParams: ["This action is executed because conditionalAction is ok"],
  status: "solved",
  time: {  
    start: 1511375841559,
    end: 1511375841576,
    duration: 17
  }
}
*/
```

## Documentation

We recommend you read the [basic concepts](#basic-concepts), see a couple of [examples](#examples) and then read the documentation:

- [**microTasks**](./docs/microTasks.md)
- [Action configuration](./docs/action.md#configuration)
- [Action parser](./docs/action.md#parser)

## Libraries

We have created the following libraries with the methods and actions most used in projects.
To use the libraries you just have to **import them** in your application.

- [collection](./docs/collection.md)
- [date](./docs/date.md)
- [logger](./docs/logger.md)
- [math](./docs/math.md)
- [mongodb](./docs/mongodb.md)
- [mysql](./docs/mysql.md)
- [request](./docs/request.md)
- [utils](./docs/utils.md)
- [validate](./docs/validate.md)

## Examples

* [Hello world](./examples/hello-world.js)
* [Async action](./examples/async-action.js)
* [Conditional action](./examples/conditional-action.js)
* [Rejected action](./examples/rejected-action.js)
* [Payload](./examples/payload.js)
* [Context](./examples/context.js)
* [Serial actions](./examples/serial-actions.js)
* [Parallel actions](./examples/parallel-actions.js)
* [Race actions](./examples/race-actions.js)
* [Result path](./examples/result-path.js)
* [Debug log](./examples/debug-log.js)

## Setup and NPM scripts

```bash
npm install
npm start # run examples/hello-world.js
```

```bash
npm run devtool # run examples/hello-world.js with devtool
```

```bash
npm run lint
```

```bash
npm run docs
```
