const _ = require('lodash')

_.mixin({

  compileData (data, context) {
    return _.mapDeep(data, (value) => {
      const obj = _.compileDataToObject(value, context)
      value = obj === undefined ? value : obj
      return _.isString(value) ? _.compileDataToString(value, context) : value
    })
  },

  compileDataToObject (str, context) {
    if (_.isString(str)) {
      const regex = new RegExp(/^{[a-zA-Z_.]*}$/g),
        matches = str.match(regex)
      if (matches) {
        const path = matches[0].substr(1, matches[0].length - 2)
        return _.get(context, path)
      }
    }
  },

  compileDataToString (str, context) {
    if (_.isString(str)) {
      const regex = new RegExp(/{{[a-zA-Z_.]*}}/g),
        matches = str.match(regex)
      return _.reduce(matches, (memo, match) => {
        const path = match.substr(2, match.length - 4)
        return memo.replace(match, _.get(context, path))
      }, str)
    }
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
