import _ from 'lodash';
import makeStrFromFile from './utils';
import getParser from './parser';

const makeTree = (obj, obj2) => {
  const keys = _.union(Object.keys(obj), Object.keys(obj2));
  return keys.reduce((acc, key) => {
    const value = obj[key];
    const value2 = obj2[key];
    const res = {
      value,
      key,
      status: '-',
    };
    if (_.has(obj2, key) && _.has(obj, key)) {
      if (!(value === value2)) return [...acc, res, { value: value2, key, status: '+' }];
      res.status = ' ';
    } else if (_.has(obj2, key)) {
      res.value = value2;
      res.status = '+';
    }
    return [...acc, res];
  }, []);
};

export default (filePathBefore, filePathAfter) => {
  const strBefore = makeStrFromFile(filePathBefore);
  const strAfter = makeStrFromFile(filePathAfter);
  const parse = getParser(filePathBefore);
  const objBefore = parse(strBefore);
  const objAfter = parse(strAfter);
  const arr = makeTree(objBefore, objAfter);
  return makeStrFromFile(arr);
};
