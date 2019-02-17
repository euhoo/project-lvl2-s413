#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.3.7', '-V, --version')
  .arguments('<first> <second>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((first, second) => {
    console.log(genDiff(first, second, program.format));
  });
program.parse(process.argv);
