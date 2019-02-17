import fs from 'fs';
import genDiff from '../src';

const path = '__tests__/__fixtures__/';
const types = ['Json', 'Yml', 'Ini'];
const testMethods = ['Flatten', 'Tree', 'FlattenPlain', 'Plain'];

const testFormats = {
  Flatten: 'tree',
  Tree: 'tree',
  FlattenPlain: 'plain',
  Plain: 'plain',
};

const fileNameParts = {
  Flatten: 'Flatten',
  FlattenPlain: 'Flatten',
  Tree: 'Tree',
  Plain: 'Tree',
};

testMethods.forEach(method => test.each(types)(`Test ${method} %s`, (element) => {
  const findPath = item => `${path}${item}${fileNameParts[method]}.${element.toLowerCase()}`;
  const received = genDiff(findPath('before'), findPath('after'), `${testFormats[method]}`);
  const expected = fs.readFileSync(`${path}expected${method}.txt`, 'utf-8');
  expect(received).toBe(expected);
}));
