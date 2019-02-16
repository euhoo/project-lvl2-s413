
const getCorrectValue = (data, depth, func) => {
  const value = Array.isArray(data) ? func(data, depth + 2) : data;
  if ((typeof value === 'object')) {
    const keys = Object.keys(value);
    const str = keys.map(key => `${'  '.repeat(depth + 2)}  ${key}: ${value[key]}`);
    return `{\n${str}\n${'  '.repeat(depth + 1)}}`;
  }
  return value;
};
const getValue = obj => (obj.status === 'added' ? obj.newValue : obj.oldValue);


const renderTree = (arr, depth = 1) => {
  const str = arr.reduce((acc, obj) => {
    const dirtyValue = obj.children || getValue(obj);
    const value = getCorrectValue(dirtyValue, depth, renderTree);
    const statusObj = {
      unchanged: `  ${obj.key}: ${value}\n`,
      nested: `  ${obj.key}: ${value}\n`,
      added: `+ ${obj.key}: ${value}\n`,
      deleted: `- ${obj.key}: ${value}\n`,
      changed: `+ ${obj.key}: ${getCorrectValue(obj.newValue, depth)}\n${'  '.repeat(depth)}- ${obj.key}: ${getCorrectValue(obj.oldValue, depth)}\n`,
    };

    return `${acc}${'  '.repeat(depth)}${statusObj[obj.status]}`;
  }, '');

  return `{\n${str}${' '.repeat(depth * 2 - 2)}}`;
};

export default renderTree;
