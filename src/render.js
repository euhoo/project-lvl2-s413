import normalize from './utils';

const render = (arr) => {
  const str = arr.reduce((acc, obj) => {
    const value = normalize(obj.value);
    return `${acc} ${'  '.repeat(0)} ${obj.status} ${obj.key}: ${value}\n`;
  }, '');
  return `{\n${str}}`;
};

export default render;
