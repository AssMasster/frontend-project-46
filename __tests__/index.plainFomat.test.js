import { test, expect } from '@jest/globals'
import path from 'path'
import fs from 'fs'
import buildDiffTree from '../src/diffBuilder/index.js'
import plain from '../formatters/plain.js'

const getFixturePath = filename =>
  path.join(process.cwd(), '__fixtures__', filename)

const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('diffOfTwoJsonFiles', () => {
  const data1 = JSON.parse(readFile('fixture1.json'))
  const data2 = JSON.parse(readFile('fixture2.json'))
  const expected = readFile('expected.plainForm.txt')
  const result = plain(buildDiffTree(data1, data2))

  expect(result).toEqual(expected)
})
