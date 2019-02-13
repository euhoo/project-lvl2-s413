import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parser';

const buildDif = (someStr) => {
  const str = someStr.reduce((acc, obj) => `${acc}  ${obj.status} ${obj.key}: ${obj.value}\n`, '');
  return `{\n${str}}`;
};

const buildAst = (obj, obj2) => {
  const keys = _.union(Object.keys(obj), Object.keys(obj2));
  return keys.reduce((acc, key) => {
    const valueBefore = obj[key];
    const valueAfter = obj2[key];
    if (_.has(obj2, key) && _.has(obj, key)) {
      if (!(valueBefore === valueAfter)) return [...acc, { value: valueBefore, key, status: '-' }, { value: valueAfter, key, status: '+' }];
      return [...acc, { value: valueBefore, key, status: ' ' }];
    } if (_.has(obj2, key)) return [...acc, { value: valueAfter, key, status: '+' }];
    return [...acc, { value: valueBefore, key, status: '-' }];
  }, []);
};
const getObj = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile).slice(1).toLowerCase();
  return parser(data, ext);
};

export default (pathToFile1, pathToFile2) => {
  const objBefore = getObj(pathToFile1);
  const objAfter = getObj(pathToFile2);
  const ast = buildAst(objBefore, objAfter);
  return buildDif(ast);
};
