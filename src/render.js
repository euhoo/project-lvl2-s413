const render = (arr) => {
  const arrayToString = value => (Array.isArray(value) ? render(value) : value);

  const normnormalize = (value) => {
    if ((typeof value === 'object')) {
      const keys = Object.keys(value);
      const str = keys.reduce((acc, key) => `${acc}\n    ${key}: ${value[key]}`, '');
      return `{${str}\n}`;
    }
    return value;
  };
  const str = arr.reduce((acc, obj) => {
    const value1 = arrayToString(obj.value);
    const value = normnormalize(value1);
    return `${acc}  ${obj.status} ${obj.key}: ${value}\n`;
  }, '');
  return `{\n${str}}`;
};

export default render;
