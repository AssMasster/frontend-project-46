#!/usr/bin/env node

import { program } from 'commander'
import { getFilesData } from '../parsers.js'
import { showDiffOfObjects } from '../index.js'
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { data1, data2 } = getFilesData(filepath1, filepath2)
    const resultOfComparison = showDiffOfObjects(data1, data2)

    console.log(resultOfComparison)

    // console.log(`Comparing ${filepath1} and ${filepath2}`)
    if (program.opts().format) {
      console.log(`Using format: ${program.opts().format}`)
    }
  })

program.parse(process.argv)
