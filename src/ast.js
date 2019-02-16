import _ from 'lodash';

const buildAst = (obj = {}, obj2 = {}) => {
  const keys = _.union(Object.keys(obj), Object.keys(obj2));

  const result = keys.reduce((acc, key) => {
    const oldValue = obj[key];
    const newValue = obj2[key];
    if (_.has(obj2, key) && _.has(obj, key)) {
      if ((typeof newValue === 'object') && (typeof oldValue === 'object')) {
        return [...acc, { key, type: 'nested', children: buildAst(oldValue, newValue) }];
      }
      if (!(oldValue === newValue)) {
        return [...acc,
          {
            key, type: 'changed', newValue, oldValue,
          }];
      }
      return [...acc, { key, type: 'unchanged', oldValue }];
    } if (_.has(obj2, key)) {
      return [...acc, { key, type: 'added', newValue }];
    }
    return [...acc, { key, type: 'deleted', oldValue }];
  }, []);

  return result;
};
export default buildAst;
