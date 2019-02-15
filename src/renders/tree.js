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
    haveChildren: ' ',
    add: '+',
    del: '-',
    addChanged: '+',
    delChanged: '-',
  };
  const str = arr.reduce((acc, obj) => `${acc}${'  '.repeat(depth)}${statusObj[obj.status]} ${obj.key}: ${normalize(obj.value)}\n`,
    '');

  return `{\n${str}${' '.repeat(depth * 2 - 2)}}`;
};

export default renderTree;
