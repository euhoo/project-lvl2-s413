const makeQuotes = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};
const checkPoint = parent => ((parent.length === 0) ? '' : '.');
const getCorrectKey = (obj, func) => (obj.type === 'nested' ? func(obj.children, obj.key) : obj.key);
const getStr = (ast, parent) => ast
  .filter(obj => obj.type !== 'unchanged')
  .map((obj) => {
    const { type } = obj;
    const typesObj = {
      changed: [`${parent}${checkPoint(parent)}${getCorrectKey(obj, getStr)}' was updated. From ${makeQuotes(obj.oldValue)} to ${makeQuotes(obj.newValue)}`],
      unchanged: '',
      nested: [`${parent}${checkPoint(parent)}${getCorrectKey(obj, getStr)}`],
      deleted: [`${parent}${checkPoint(parent)}${getCorrectKey(obj, getStr)}' was removed`],
      added: [`${parent}${checkPoint(parent)}${getCorrectKey(obj, getStr)}' was added with value: ${makeQuotes(obj.newValue)}`],
    };
    return typesObj[type];
  })
  .join('\nProperty \''); // присоединяю Property к каждой строчке,начиная со второй
  // попробовать сделать,чтобы Property и кавычка в теле функции реализовывались
export default (arr, parent = '') => `Property '${getStr(arr, parent)}`; // Присоединяю Property в начало и возвращаю функцию
