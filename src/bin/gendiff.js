#!/usr/bin/env node
import program from 'commander';
import { func } from '../index';

program
  .version('1.0.27', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first> <second>')
  .option('-f, --format [type]', 'Output format');
program.parse(process.argv);

if (!program.args.length) program.help();

console.log(func('Well done'));
