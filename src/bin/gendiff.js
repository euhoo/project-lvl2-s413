#!/usr/bin/env node
import program from 'commander';
// import genDiff from '..'; пока закомментил

program
  .version('1.0.27', '-V, --version')
  .arguments('<first> <second>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');
program.parse(process.argv);

// console.log(genDiff(first, second));
