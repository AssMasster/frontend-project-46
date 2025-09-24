import { test, expect } from '@jest/globals'
import path from 'path'
import fs from 'fs'
import buildDiffTree from '../src/diffBuilder/index.js'
import stylish from '../formatters/stylish.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('diffOfTwoJsonFiles', () => {
  const data1 = JSON.parse(readFile('fixture1.json'))
  const data2 = JSON.parse(readFile('fixture2.json'))
  const expected = readFile('expected.txt')
  const result = stylish(buildDiffTree(data1, data2))

  expect(result).toEqual(expected)
})
