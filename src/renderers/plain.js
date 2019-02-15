// пока заглушка.не успел.
const makeClean = (value) => {
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};
const getStr = (arr, parent = '') => {
  const checkObj = obj => ((Array.isArray(obj.value)) ? getStr(obj.value, obj.key) : obj);
  const checkParents = par => ((par.length === 0) ? par : `${par}.`);
  const str = arr.reduce((acc, obj) => {
    const statuses = {
      addChanged: `${checkParents(parent)}${obj.key}' was updated. From ${makeClean(obj.oldValue)} to ${makeClean(obj.value)}~`,
      unchanged: '',
      haveChildren: `${checkParents(parent)}${checkObj(obj)}~`,
      deleted: `${checkParents(parent)}${obj.key}' was removed~`,
      added: `${checkParents(parent)}${obj.key}' was added with value: ${makeClean(obj.value)}~`,
      delChanged: '',
    };
    return `${acc}${statuses[obj.status]}`;
  }, '');
  return str.substring(0, str.length - 1).split('~').join('\nProperty \'');
};
export default (arr, parent = '') => {
  const str = getStr(arr, parent);
  return `Property '${str}`;
};
