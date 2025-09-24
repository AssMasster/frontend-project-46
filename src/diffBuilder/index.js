import _ from 'lodash'

export default function buildDiffTree(obj1, obj2) {
  const keysOfFirst = Object.keys(obj1)
  const keysOfSecond = Object.keys(obj2)
  const arrOfUniqKeys = _.sortBy(Array.from(new Set ([...keysOfFirst, ...keysOfSecond])))
  function isObject(value) {
    return _.isObject(value) && !_.isArray(value)
  }
  const result = arrOfUniqKeys.map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]
    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiffTree(value1, value2),
      }
    }
    else if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        type: 'removed',
        value: obj1[key],
      }
    }
    else if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      }
    }
    else if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(obj1[key], obj2[key])) {
        return {
          key,
          type: 'unchanged',
          value: obj1[key],
        }
      }
      else {
        return {
          key,
          type: 'changed',
          oldValue: obj1[key],
          newValue: obj2[key],
        }
      }
    }
  })
  return result
}
