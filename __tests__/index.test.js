import fs from 'fs';
import genDiff from '../src';

test('Test 1: Json in test file', () => {
  const beforePath = '__tests__/__fixtures__/before.json';
  const afterPath = '__tests__/__fixtures__/after.json';
  // const expectedPath = '__tests__/__fixtures__/result.txt';
  const received = genDiff(beforePath, afterPath);
  // console.log(`Мой вариант:\n ${received}`);

  const expected = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  // console.log(`Тесты:\n ${expected}`);
  expect(received).toBe(expected);
});
test('Test 2: Yml in test file', () => {
  const beforePath = '__tests__/__fixtures__/before.yml';
  const afterPath = '__tests__/__fixtures__/after.yml';
  // const expectedPath = '__tests__/__fixtures__/result.txt';
  const received = genDiff(beforePath, afterPath);
  // console.log(`Мой вариант:\n ${received}`);

  const expected = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  // console.log(`Тесты:\n ${expected}`);
  expect(received).toBe(expected);
});
test('Test 1.2: Json in external file result.txt', () => {
  const beforePath = '__tests__/__fixtures__/before.json';
  const afterPath = '__tests__/__fixtures__/after.json';
  const expectedPath = '__tests__/__fixtures__/result.txt';
  const received = genDiff(beforePath, afterPath);
  console.log(`Мой вариант:\n ${received}`);

  const expected = fs.readFileSync(expectedPath, 'utf-8');
  console.log(`result.txt:\n ${expected}`);
  expect(received).toBe(expected);
});

 test('Test 2.2: Yaml in external file result.txt', () => {
  const beforePath = '__tests__/__fixtures__/before.yml';
  const afterPath = '__tests__/__fixtures__/after.yml';
  const expectedPath = '__tests__/__fixtures__/result.txt';
  const received = genDiff(beforePath, afterPath);
  // console.log(`Мой вариант:\n ${received}`);

  const expected = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');
  // console.log(`:\n ${expected}`);
  expect(received).toBe(expected);
});
