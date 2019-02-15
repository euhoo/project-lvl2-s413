import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';
const types = ['Json', 'Yml', 'Ini'];

test.each(types)('Test %s', (element) => {
  const received = genDiff(`${path}before.${element.toLowerCase()}`, `${path}after.${element.toLowerCase()}`);
  expect(fs.readFileSync(`${path}expected.txt`, 'utf-8')).toBe(received);
});

test.each(types)('Test tree %s', (element) => {
  const received = genDiff(`${path}beforeTree.${element.toLowerCase()}`, `${path}afterTree.${element.toLowerCase()}`);
  expect(fs.readFileSync(`${path}expectedTree.txt`, 'utf-8')).toBe(received);
});

test.each(types)('Test Flatten Plain %s', (element) => {
  const received = genDiff(`${path}before.${element.toLowerCase()}`, `${path}after.${element.toLowerCase()}`, 'plain');
  expect(fs.readFileSync(`${path}expectedFlattenPlain.txt`, 'utf-8')).toBe(received);
});

test.each(types)('Test Plain %s', (element) => {
  const received = genDiff(`${path}beforeTree.${element.toLowerCase()}`, `${path}afterTree.${element.toLowerCase()}`, 'plain');
  expect(fs.readFileSync(`${path}expectedPlain.txt`, 'utf-8')).toBe(received);
});
