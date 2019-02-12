import getDiff from '../src/files/makeDifference';


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

test('Mytest1', () => {
  const dif = getDiff(before, after);

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`;
  expect(dif).toEqual(expected);
});
