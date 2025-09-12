#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    // Здесь будет логика сравнения файлов
    console.log(`Comparing ${filepath1} and ${filepath2}`);
    if (program.opts().format) {
      console.log(`Using format: ${program.opts().format}`);
    }
  });

program.parse(process.argv);