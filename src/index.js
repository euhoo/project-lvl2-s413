import fs from 'fs';
import path from 'path';
import parser from './parser';
import renderer from './renderers';
import buildAst from './ast';

const getObj = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile).slice(1).toLowerCase();
  return parser(data, ext);
};

export default (pathToFile1, pathToFile2, type = 'tree') => {
  const objBefore = getObj(pathToFile1);
  const objAfter = getObj(pathToFile2);
  const ast = buildAst(objBefore, objAfter);
  const result = renderer(ast, type);
  return result;
};
