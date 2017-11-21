const _ = require('lodash'),

  compileStringToString = (str, context) => {
    const regex = new RegExp(/{{[a-zA-Z0-9[]_.]*}}/g),
      matches = str.match(regex)
    return _.reduce(matches, (memo, match) => {
      const path = match.substr(2, match.length - 4)
      return memo.replace(match, _.get(context, path))
    }, str)
  },

  compileStringToObject = (str, context) => {
    const regex = new RegExp(/^{[a-zA-Z0-9[]_.]*}$/g),
      matches = str.match(regex)
    if (matches) {
      const path = matches[0].substr(1, matches[0].length - 2)
      return _.get(context, path)
    } else {
      return str
    }
  }

_.mixin({

  compileData (data, context) {
    return _.mapDeep(data, (str) => {
      if (_.isString(str)) {
        str = compileStringToString(str, context)
        return compileStringToObject(str, context)
      } else {
        return str
      }
    })
  },

  isPromise (obj) {
    return obj instanceof Promise
  },

  mapDeep (data, customizer) {
    if (_.isArray(data)) {
      return _.map(data, (value) => {
        return _.mapDeep(value, customizer)
      })
    } else if (_.isPlainObject(data)) {
      return _.reduce(data, (acc, value, key) => {
        acc[key] = _.mapDeep(value, customizer)
        return acc
      }, {})
    } else {
      return customizer(data)
    }
  },

  parseArray (arr) {
    arr = arr || []
    return _.isArray(arr) ? arr : [arr]
  },

  stack (removeLevels = 1) {
    const stack = new Error().stack,
      stackArr = stack.split('\n')
    removeLevels = removeLevels || 1
    stackArr.splice(1, removeLevels)
    return stackArr.join('')
  },

  stringify (obj) {
    const cache = []
    return JSON.stringify(obj, function (key, value) {
      if (_.isString(value) || _.isNumber(value) || _.isBoolean(value)) {
        return value
      } else if (_.isError(value)) {
        return _.get(value, 'stack', '').replace(/\\n/g, '')
      } else if (_.isPlainObject(value) || _.isArray(value)) {
        if (cache.indexOf(value) > 0) {
          cache.push(value)
          return value
        }
      }
    })
  }

})

module.exports = _
