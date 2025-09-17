import { showDiffOfObjects } from '../src/index.js';
import path from 'path'
import fs from 'fs'

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('diffOfTwoJsonFiles', () => {
  const data1 = JSON.parse(readFile('fixture1.json'));
  const data2 = JSON.parse(readFile('fixture2.json'));
  const expected = readFile('expected.txt'); // ← ИЗМЕНИТЕ ИМЯ
  const result = showDiffOfObjects(data1, data2);
  
  expect(result).toEqual(expected); // ← Теперь работает
})
