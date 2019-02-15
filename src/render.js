

const render = (arr, depth = 1) => {
  const arrayToString = value => (Array.isArray(value) ? render(value, depth + 2) : value);

  const normalize = (data) => {
    const value = arrayToString(data);
    if ((typeof value === 'object')) {
      const keys = Object.keys(value);
      const str = keys.reduce((acc, key) => `${acc}${'  '.repeat(depth + 2)}  ${key}: ${value[key]}`, '');
      return `{\n${str}\n${'  '.repeat(depth + 1)}}`;
    }
    return value;
  };

  const str = arr.reduce((acc, obj) => {
    const value = normalize(obj.value);
    return `${acc}${'  '.repeat(depth)}${obj.status} ${obj.key}: ${''.repeat(depth)}${value}\n`;
  }, '');
  return `{\n${str}${' '.repeat(depth * 2 - 2)}}`;
};

export default render;
