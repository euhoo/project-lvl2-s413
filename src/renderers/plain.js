import _ from 'lodash';

const makeQuotes = (value) => {
  if (value instanceof Object) return '[complex value]';
  if (typeof value === 'boolean') return value;
  return `'${value}'`;
};

const typesObj = {
  changed: (obj, parent) => `Property '${[...parent, obj.key].join('.')}' was updated. From ${makeQuotes(obj.oldValue)} to ${makeQuotes(obj.newValue)}`,
  unchanged: '',
  nested: (obj, parent, func) => _.flatten(func(obj.children, [...parent, obj.key])),
  deleted: (obj, parent) => `Property '${[...parent, obj.key].join('.')}' was removed`,
  added: (obj, parent) => `Property '${[...parent, obj.key].join('.')}' was added with value: ${makeQuotes(obj.newValue)}`,
};

export default (data) => {
  const renderPlain = (ast, parent = []) => ast
    .filter(obj => obj.type !== 'unchanged')
    .map(el => typesObj[el.type](el, parent, renderPlain));
  return _.flatten(renderPlain(data))
    .join('\n');
};
