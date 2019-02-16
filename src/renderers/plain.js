const makeQuotes = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};
const checkParents = parent => ((parent.length === 0) ? parent : `${parent}.`);
const getCorrectKey = (obj, func) => (obj.children ? func(obj.children, obj.key) : obj.key);
const getPattern = (obj, parent, func) => `${checkParents(parent)}${getCorrectKey(obj, func)}`;

const getStatusStr = (obj, pattern) => {
  const { status } = obj;
  const allStatusesObj = {
    changed: `${pattern}' was updated. From ${makeQuotes(obj.oldValue)} to ${makeQuotes(obj.newValue)}~`,
    unchanged: '',
    nested: `${pattern}~`,
    deleted: `${pattern}' was removed~`,
    added: `${pattern}' was added with value: ${makeQuotes(obj.newValue)}~`,
  };
  return allStatusesObj[status];
};
const getStr = (arr, parent) => {
  const str = arr.reduce((acc, obj) => {
    const pattern = getPattern(obj, parent, getStr);
    const strOfStatuses = getStatusStr(obj, pattern);
    return `${acc}${strOfStatuses}`;
  }, '');
  return str.substring(0, str.length - 1).split('~').join('\nProperty \'');
};
export default (arr, parent = '') => `Property '${getStr(arr, parent)}`;
