import { has } from 'lodash';
import fs from 'fs';

const getStrFromFile = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

const makeArr = (before, after) => {
  const total = Object.assign({}, before, after);
  const keys = Object.keys(total);
  return keys.reduce((acc, key) => {
    if (has(before, key) && has(after, key)) {
      return (before[key] === after[key]) ? [...acc, { name: before[key], key, operation: ' ' }]
        : [...acc, { name: before[key], key, operation: '+' }, { name: after[key], key, operation: '-' }];
    }
    if (has(after, key)) return [...acc, { name: after[key], key, operation: '-' }];
    return [...acc, { name: before[key], key, operation: '+' }];
  }, []);
};
const makeResult = (arr) => {
  const resultString = arr.reduce((acc, obj) => `${acc}  ${obj.operation} ${obj.key}: ${obj.name}\n`, '');
  return `{\n${resultString}}`;
};

export default (fileBefore, fileAfter) => {
  const strBefore = getStrFromFile(fileBefore);
  const strAfter = getStrFromFile(fileAfter);
  const objBefore = JSON.parse(strBefore);
  const objAfter = JSON.parse(strAfter);
  const arr = makeArr(objBefore, objAfter);
  return makeResult(arr);
};
