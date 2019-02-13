import genDiff from '../src';

const before = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const after = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('myTest', () => {
  const received = genDiff(before, after);

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(received).toEqual(expected);
});
