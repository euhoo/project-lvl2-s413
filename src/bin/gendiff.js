#!/usr/bin/env node
// import makeHelp from '../files/calc';
import commander from 'commander';

const program = require('commander');

program
  .version('0.0.1', '-v, --version')
  .description(`Usage: gendiff [options] <firstConfig> <secondConfig>

  Compares two configuration files and shows a difference.

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --format [type]  Output format`)
  .option('-h, --help', program.description)
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format [type]', 'type')
  .parse(process.argv);

if (program.help) {console.log(`Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:

  -h, --help           output usage information
  -V, --version        output the version number
  -f, --format [type]  Output format`);}
if (program.version) console.log(program.version);
if (program.format) console.log('  - % format', program.format);
