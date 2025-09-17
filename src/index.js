import _ from 'lodash'

export function showDiffOfObjects(obj1, obj2) {
  const keysOfObj1 = Object.keys(obj1)
  const keysOfObj2 = Object.keys(obj2)

  const result = []

  const uniqKeys = new Set ([...keysOfObj1, ...keysOfObj2])
  const sortedUniqKeys = _.sortBy(Array.from(uniqKeys))

  for (const key of sortedUniqKeys) {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`)
    }
    else if (!_.has(obj1, key) && _.has(obj2, key)) {
      result.push(`  + ${key}: ${obj2[key]}`)
    }
    else if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(obj1[key], obj2[key])) {
        result.push(`    ${key}: ${obj1[key]}`)
      }
      else {
        result.push(`  - ${key}: ${obj1[key]}`)
        result.push(`  + ${key}: ${obj2[key]}`)
      }
    }
  }
  return `{\n${result.join('\n')}\n}`
}
