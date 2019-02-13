import fs from 'fs';

export default (someStr) => { // добавил полиморфизм в мейкер строки
  if (Array.isArray(someStr)) {
    const str = someStr.reduce((acc, obj) => `${acc}  ${obj.status} ${obj.key}: ${obj.value}\n`, '');
    return `{\n${str}}`;
  }
  return fs.readFileSync(someStr, 'utf-8');
};
