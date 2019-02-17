const makeQuotes = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};
const checkPoint = parent => ((parent.length === 0) ? '' : '.');
const checkNested = (obj, func) => (obj.type === 'nested' ? func(obj.children, obj.key) : obj.key);
const getStr = (ast, parent) => ast
  .filter(obj => obj.type !== 'unchanged')
  .map((obj) => {
    const { type } = obj;
    const typesObj = {
      changed: `${parent}${checkPoint(parent)}${obj.key}' was updated. From ${makeQuotes(obj.oldValue)} to ${makeQuotes(obj.newValue)}`,
      unchanged: '',
      nested: `${parent}${checkPoint(parent)}${checkNested(obj, getStr)}`,
      deleted: `${parent}${checkPoint(parent)}${obj.key}' was removed`,
      added: `${parent}${checkPoint(parent)}${obj.key}' was added with value: ${makeQuotes(obj.newValue)}`,
    };
    return typesObj[type];
  })
  .join('\nProperty \'');
export default (arr, parent = '') => `Property '${getStr(arr, parent)}`;
