#!/usr/bin/env node
import program from 'commander';

program
  .version('1.0.8', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');
program.parse(process.argv);

if (!program.args.length) program.help();
