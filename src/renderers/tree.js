import _ from 'lodash';

const getCorrectValue = (value, depth) => {
  if (!(typeof value === 'object')) return value;
  const keys = Object.keys(value);
  const result = keys.map(key => `${'    '.repeat(depth + 1)}${key}: ${value[key]}`);
  return `{\n${result.join('\n')}\n${'    '.repeat(depth)}}`;
};

const renderTree = (ast, depth = 0) => {
  const makeStr = (operation, key, value) => `${'  '.repeat(depth * 2 + 1)}${operation} ${key}: ${value}`;

  const typesObj = {
    unchanged: obj => makeStr(' ', obj.key, getCorrectValue(obj.oldValue, depth + 1)),
    nested: obj => makeStr(' ', obj.key, renderTree(obj.children, depth + 1)),
    added: obj => makeStr('+', obj.key, getCorrectValue(obj.newValue, depth + 1)),
    deleted: obj => makeStr('-', obj.key, getCorrectValue(obj.oldValue, depth + 1)),
    changed: obj => [typesObj.added(obj), typesObj.deleted(obj)],
  };
  const mapped = ast.map(obj => typesObj[obj.type](obj));
  const result = _
    .flatten(mapped)
    .join('\n');
  return `{\n${result}\n${'    '.repeat(depth)}}`;
};

export default renderTree;
