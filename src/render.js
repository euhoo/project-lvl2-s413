const render = (arr, depth = 1) => {
  const normalize = (data) => {
    const value = Array.isArray(data) ? render(data, depth + 2) : data;
    if ((typeof value === 'object')) {
      const keys = Object.keys(value);
      const str = keys.map(key => `${'  '.repeat(depth + 2)}  ${key}: ${value[key]}`);
      return `{\n${str}\n${'  '.repeat(depth + 1)}}`;
    }
    return value;
  };
  const str = arr.reduce((acc, obj) => `${acc}${'  '.repeat(depth)}${obj.status} ${obj.key}: ${normalize(obj.value)}\n`,
    '');

  return `{\n${str}${' '.repeat(depth * 2 - 2)}}`;
};
export default render;
