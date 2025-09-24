import { test, expect } from '@jest/globals'
import path from 'path'
import fs from 'fs'
import buildDiffTree from '../src/diffBuilder/index.js'
import json from '../formatters/json.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('diffOfTwoJsonFiles', () => {
  const data1 = JSON.parse(readFile('fixture1.json'))
  const data2 = JSON.parse(readFile('fixture2.json'))
  const output = json(buildDiffTree(data1, data2))
  const result = JSON.parse(output)

  expect(result).toEqual(buildDiffTree(data1, data2))
})
