import render from './render';

const arrayToString = value => (Array.isArray(value) ? render(value) : value);

const objToString = (value) => {
  if ((typeof value === 'object')) {
    const keys = Object.keys(value);
    const str = keys.reduce((acc, key) => `${acc}\n    ${key}: ${value[key]}`, '');
    return `{${str}\n}`;
  }
  return value;
};
export default (data) => {
  const value = arrayToString(data);
  return objToString(value);
};
