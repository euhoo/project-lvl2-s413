const makeQuotes = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};
const checkPoint = parent => ((parent.length === 0) ? '' : '.'); // сделать без if и тренарного оператора
const getCorrectKey = (obj, func) => (obj.type === 'nested' ? func(obj.children, obj.key) : obj.key);
const getPattern = (obj, parent, func) => `${parent}${checkPoint(parent)}${getCorrectKey(obj, func)}`;

const getStrFromTypes = (obj, pattern) => {
  const { type } = obj;
  const allTypesObj = {
    changed: [`${pattern}' was updated. From ${makeQuotes(obj.oldValue)} to ${makeQuotes(obj.newValue)}`],
    unchanged: '',
    nested: [`${pattern}`],
    deleted: [`${pattern}' was removed`],
    added: [`${pattern}' was added with value: ${makeQuotes(obj.newValue)}`],
  };
  return allTypesObj[type];
};

const getStr = (ast, parent) => ast
  .filter(item => item.type !== 'unchanged')
  .map((obj) => {
    const pattern = getPattern(obj, parent, getStr);
    return getStrFromTypes(obj, pattern);
  })
  .join('\nProperty \''); // присоединяю Property к каждой строчке,начиная со второй
  // попробовать сделать,чтобы Property и кавычка в теле функции реализовывались
export default (arr, parent = '') => `Property '${getStr(arr, parent)}`; // Присоединяю Property в начало и возвращаю функцию
