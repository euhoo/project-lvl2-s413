import genDiff from '../src';

const beforePath = '__tests__/__fixtures__/before.json';
const afterPath = '__tests__/__fixtures__/after.json';

test('myTest', () => {
  const received = genDiff(beforePath, afterPath);
  // console.log(`Мой вариант:\n ${received}`);

  const expected = `{
  + timeout: 20
  - timeout: 50
  + verbose: true
    host: hexlet.io
  - proxy: 123.234.53.22
  - follow: false
}`;
  // console.log(`Тесты:\n ${expected}`);
  expect(received).toEqual(expected);
});
