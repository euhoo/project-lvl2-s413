const renderTree = (arr, depth = 1) => {
  const normalize = (data) => {
    const value = Array.isArray(data) ? renderTree(data, depth + 2) : data;
    if ((typeof value === 'object')) {
      const keys = Object.keys(value);
      const str = keys.map(key => `${'  '.repeat(depth + 2)}  ${key}: ${value[key]}`);
      return `{\n${str}\n${'  '.repeat(depth + 1)}}`;
    }
    return value;
  };
  const statusObj = {
    unchanged: ' ',
    nested: ' ',
    added: '+',
    deleted: '-',
    changed: '+',
    deletedWhenChanged: '-',
  };
  const str = arr.reduce((acc, obj) => {
    const getValue = (oldValue = '', newValue = '') => {
      if (obj.status === 'changed' || obj.status === 'added') return newValue;
      // if (obj.status === 'deletedWhenChanged' ||
      // obj.status === 'unchanged' || obj.status === 'deleted')
      return oldValue;
    };
    return `${acc}${'  '.repeat(depth)}${statusObj[obj.status]} ${obj.key}: ${Array.isArray(obj.children) ? normalize(obj.children) : normalize(getValue(obj.oldValue, obj.newValue))}\n`;
  }, '');

  return `{\n${str}${' '.repeat(depth * 2 - 2)}}`;
};

export default renderTree;
