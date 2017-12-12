const _ = require('lodash'),

  compileStringToString = (str, context) => {
    const regex = new RegExp(/{{[a-zA-Z0-9[\]_.]*}}/g),
      matches = str.match(regex)
    return _.reduce(matches, (memo, match) => {
      const path = match.substr(2, match.length - 4)
      return memo.replace(match, _.get(context, path))
    }, str)
  },

  compileStringToObject = (str, context) => {
    const regex = new RegExp(/^{[a-zA-Z0-9[\]_.]*}$/g),
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

  mapDeep (data, valueCustomizer, keyCustomizer, __cache = []) {
    // handle cyclic dependencies
    if (_.isArray(data) || _.isPlainObject(data)) {
      if (__cache.indexOf(data) >= 0) {
        return _.cloneDeep(data)
      }
      __cache.push(data)
    }
    // iterate data
    if (_.isArray(data)) {
      return _.map(data, (value) => {
        return _.mapDeep(value, valueCustomizer, keyCustomizer, __cache)
      })
    } else if (_.isPlainObject(data)) {
      return _.reduce(data, (acc, value, key) => {
        if (keyCustomizer) {
          key = keyCustomizer(key)
        }
        acc[key] = _.mapDeep(value, valueCustomizer, keyCustomizer, __cache)
        return acc
      }, {})
    } else {
      return valueCustomizer(data)
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

  removeCyclicDependencies (data, clone = true, __cache = []) {
    if (_.isArray(data) || _.isPlainObject(data)) {
      if (__cache.indexOf(data) >= 0) {
        return clone === true ? _.cloneDeep(data) : clone
      }
      __cache.push(data)
    }
    if (_.isFunction(data)) {
      return 'function'
    }
    if (_.isArray(data)) {
      return _.map(data, (value) => {
        return _.removeCyclicDependencies(value, clone, __cache)
      })
    } else if (_.isPlainObject(data)) {
      return _.reduce(data, (acc, value, key) => {
        acc[key] = _.removeCyclicDependencies(value, clone, __cache)
        return acc
      }, {})
    } else {
      return data
    }
  },

  stringify (data) {
    return JSON.stringify(_.removeCyclicDependencies(data))
  }

})

module.exports = _
