import { has } from 'lodash';
import { fs } from 'fs';

// найти функцию, которая принимает файл и отдает строку
// применить к результату JSON.parse()
const makeTree = (before, after) => {
  const total = Object.assign({}, before, after);
  const keys = Object.keys(total);
  return keys.reduce((acc, key) => {
    if (has(before, key) && has(after, key)) {
      return (before[key] === after[key]) ? [...acc, { name: before[key], key, operation: ' ' }]
        : [...acc, { name: after[key], key, operation: '+' }, { name: before[key], key, operation: '-' }];
    }
    if (has(after, key)) return [...acc, { name: after[key], key, operation: '+' }];
    return [...acc, { name: before[key], key, operation: '-' }];
  }, []);
};
const makeResult = (arr) => {
  const resultString = arr.reduce((acc, obj) => `${acc}  ${obj.operation} ${obj.key}: ${obj.name}\n`, '');
  return `{\n${resultString}}`;
};

export default (before, after) => {
  const arr = makeTree(before, after);
  return makeResult(arr);
};
