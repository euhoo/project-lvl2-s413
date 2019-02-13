import fs from 'fs';
import genDiff from '../src';

const expectedPath = '__tests__/__fixtures__/expected.txt';
const beforePath = '__tests__/__fixtures__/before.';
const afterPath = '__tests__/__fixtures__/after.';
const expected = fs.readFileSync(expectedPath, 'utf-8');
const tests = ['Json', 'Yml', 'Ini'];
const func = element => test(`Test : ${element}`, () => {
  const received = genDiff(`${beforePath}${element.toLowerCase()}`, `${afterPath}${element.toLowerCase()}`);
  expect(expected).toBe(received);
});
tests.forEach(func);
