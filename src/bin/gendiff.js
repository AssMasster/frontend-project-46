#!/usr/bin/env node

import { program } from 'commander'
import { getFilesData } from '../parsers.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { data1, data2 } = getFilesData(filepath1, filepath2)

    console.log('File 1 data:', JSON.stringify(data1, null, 2))
    console.log('File 2 data:', JSON.stringify(data2, null, 2))

    console.log(`Comparing ${filepath1} and ${filepath2}`)
    if (program.opts().format) {
      console.log(`Using format: ${program.opts().format}`)
    }
  })

program.parse(process.argv)
