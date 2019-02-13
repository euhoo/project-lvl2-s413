import { has } from 'lodash';
import fs from 'fs';

const makeStrFromFile = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

const makeArr = (before, after) => {
  const unionOfObjects = Object.assign({}, before, after);
  const keys = Object.keys(unionOfObjects);
  return keys.reduce((acc, key) => {
    if (has(before, key) && has(after, key)) {
      return (before[key] === after[key]) ? [...acc, { name: before[key], key, operation: ' ' }]
        : [...acc, { name: before[key], key, operation: '-' }, { name: after[key], key, operation: '+' }];
    }
    if (has(after, key)) return [...acc, { name: after[key], key, operation: '+' }];
    return [...acc, { name: before[key], key, operation: '-' }];
  }, []);
};
const makeStringFromArray = (arr) => {
  const resultString = arr.reduce((acc, obj) => `${acc}  ${obj.operation} ${obj.key}: ${obj.name}\n`, '');
  return `{\n${resultString}}`;
};

export default (filePathBefore, filePathAfter) => {
  const [strBefore, strAfter] = [makeStrFromFile(filePathBefore), makeStrFromFile(filePathAfter)];
  const [objBefore, objAfter] = [JSON.parse(strBefore), JSON.parse(strAfter)];
  const arr = makeArr(objBefore, objAfter);
  return makeStringFromArray(arr);
};
