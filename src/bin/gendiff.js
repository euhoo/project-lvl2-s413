#!/usr/bin/env node
import program from 'commander';
import getDiff from '../files/makeDifference';

program
  .version('1.0.8', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');
program.parse(process.argv);

if (!program.args.length) program.help();

export default (before, after) => {
  getDiff(before, after);
};
