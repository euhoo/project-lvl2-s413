const getCorrectValue = (data, func, depth) => {
  const value = Array.isArray(data) ? func(data, depth + 2) : data;
  if ((typeof value === 'object')) {
    const keys = Object.keys(value);
    const str = keys.map(key => `${'  '.repeat(depth + 2)}  ${key}: ${value[key]}`);
    return `{\n${str}\n${'  '.repeat(depth + 1)}}`;
  }
  return value;
};
const getValue = (oldValue = '', newValue = '', obj) => (obj.status === 'changed' || obj.status === 'added' ? newValue : oldValue);

const statusObj = {
  unchanged: ' ',
  nested: ' ',
  added: '+',
  deleted: '-',
  changed: '+',
  deletedWhenChanged: '-',
};
const renderTree = (arr, depth = 1) => {
  const str = arr.reduce((acc, obj) => {
    const dirtyValue = obj.children || getValue(obj.oldValue, obj.newValue, obj);
    const value = getCorrectValue(dirtyValue, renderTree, depth);
    return `${acc}${'  '.repeat(depth)}${statusObj[obj.status]} ${obj.key}: ${value}\n`;
  }, '');

  return `{\n${str}${' '.repeat(depth * 2 - 2)}}`;
};

export default renderTree;
