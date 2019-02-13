import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parser';

const makeDif = (someStr) => {
  const str = someStr.reduce((acc, obj) => `${acc}  ${obj.status} ${obj.key}: ${obj.value}\n`, '');
  return `{\n${str}}`;
};

const makeAst = (obj, obj2) => {
  const keys = _.union(Object.keys(obj), Object.keys(obj2));
  return keys.reduce((acc, key) => {
    const value = obj[key];
    const value2 = obj2[key];
    if (_.has(obj2, key) && _.has(obj, key)) {
      if (!(value === value2)) return [...acc, { value, key, status: '-' }, { value: value2, key, status: '+' }];
      return [...acc, { value, key, status: ' ' }];
    } if (_.has(obj2, key)) return [...acc, { value: value2, key, status: '+' }];
    return [...acc, { value, key, status: '-' }];
  }, []);
};
const makeObj = (file) => {
  const data = fs.readFileSync(file, 'utf-8');
  const ext = path.extname(file).slice(1).toLowerCase();
  return parser(data, ext);
};

export default (file1, file2) => {
  const obj1 = makeObj(file1);
  const obj2 = makeObj(file2);
  const ast = makeAst(obj1, obj2);
  return makeDif(ast);
};
