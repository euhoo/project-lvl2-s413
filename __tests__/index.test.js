import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';
const types = ['Json', 'Yml', 'Ini'];
const format = ['Flatten', 'Tree', 'FlattenPlain', 'Plain'];
const obj = {
  Flatten: 'tree',
  Tree: 'tree',
  FlattenPlain: 'plain',
  Plain: 'plain',
};

format.forEach(item => test.each(types)(`Test ${item} %s`, (element) => {
  const received = genDiff(`${path}before${item}.${element.toLowerCase()}`, `${path}after${item}.${element.toLowerCase()}`, `${obj[item]}`);
  expect(fs.readFileSync(`${path}expected${item}.txt`, 'utf-8')).toBe(received);
}));
