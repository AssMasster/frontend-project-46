import _ from 'lodash'

export default function buildDiffTree(obj1, obj2) {
  const keysOfFirst = Object.keys(obj1)
  const keysOfSecond = Object.keys(obj2)
  const arrOfUniqKeys = _.sortBy(Array.from(new Set ([...keysOfFirst, ...keysOfSecond])))
  function isObject(value) {
    return _.isObject(value) && !_.isArray(value)
  }
  const result = []
  for (const key of arrOfUniqKeys) {
    const value1 = obj1[key]
    const value2 = obj2[key]
    const cellOfResult = {}
    if (isObject(value1) && isObject(value2)) {
      cellOfResult.key = key
      cellOfResult.type = 'nested'
      cellOfResult.children = buildDiffTree(value1, value2)
    }
    else if (_.has(obj1, key) && !_.has(obj2, key)) {
      cellOfResult.key = key
      cellOfResult.type = 'removed'
      cellOfResult.value = obj1[key]
    }
    else if (!_.has(obj1, key) && _.has(obj2, key)) {
      cellOfResult.key = key
      cellOfResult.type = 'added'
      cellOfResult.value = obj2[key]
    }
    else if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(obj1[key], obj2[key])) {
        cellOfResult.key = key
        cellOfResult.type = 'unchanged'
        cellOfResult.value = obj1[key]
      }
      else {
        cellOfResult.key = key
        cellOfResult.type = 'changed'
        cellOfResult.oldValue = obj1[key]
        cellOfResult.newValue = obj2[key]
      }
    }
    result.push(cellOfResult)
  }
  return result
}
