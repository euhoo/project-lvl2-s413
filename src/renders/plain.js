// пока заглушка.не успел.
const makeClean = (value) => {
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};
const getStr = (arr, parent = '') => {
  const ifObj = obj => ((Array.isArray(obj.value)) ? getStr(obj.value, obj.key) : obj);
  const ifParents = par => ((par.length === 0) ? par : `${par}.`);
  const func = (acc, obj) => {
    const statuses = {
      addChanged: `${ifParents(parent)}${obj.key}' was updated. From ${makeClean(obj.oldValue)} to ${makeClean(obj.value)}~`,
      unchanged: '',
      haveChildren: `${ifParents(parent)}${ifObj(obj)}~`,
      del: `${ifParents(parent)}${obj.key}' was removed~`,
      add: `${ifParents(parent)}${obj.key}' was added with value: ${makeClean(obj.value)}~`,
      delChanged: '',
    };
    return `${acc}${statuses[obj.status]}`;
  };

  const str = arr.reduce(func, '');
  return str.substring(0, str.length - 1).split('~').join('\nProperty \'');
};
export default (arr, parent = '') => {
  const str = getStr(arr, parent);
  return `Property '${str}`;
};
