import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';
const types = ['Json', 'Yml', 'Ini'];
const waysOfTest = ['Flatten', 'Tree', 'FlattenPlain', 'Plain'];
const testsFormat = {
  Flatten: 'tree',
  Tree: 'tree',
  FlattenPlain: 'plain',
  Plain: 'plain',
};
const fileName = {
  Flatten: 'Flatten',
  FlattenPlain: 'Flatten',
  Tree: 'Tree',
  Plain: 'Tree',
};

waysOfTest.forEach(item => test.each(types)(`Test ${item} %s`, (element) => {
  const received = genDiff(`${path}before${fileName[item]}.${element.toLowerCase()}`, `${path}after${fileName[item]}.${element.toLowerCase()}`, `${testsFormat[item]}`);
  expect(fs.readFileSync(`${path}expected${item}.txt`, 'utf-8')).toBe(received);
}));
