import _ from 'lodash';

const buildAst = (obj = {}, obj2 = {}) => {
  const keys = _.union(Object.keys(obj), Object.keys(obj2));

  const result = keys.reduce((acc, key) => {
    const oldValue = obj[key];
    const newValue = obj2[key];
    if (_.has(obj2, key) && _.has(obj, key)) {
      if ((typeof newValue === 'object') && (typeof oldValue === 'object')) {
        return [...acc, { key, status: 'nested', children: buildAst(oldValue, newValue) }];
      }
      if (!(oldValue === newValue)) {
        return [...acc,
          {
            key, status: 'changed', newValue, oldValue,
          },
          { key, status: 'deletedWhenChanged', oldValue }];
      }
      return [...acc, { key, status: 'unchanged', oldValue }];
    } if (_.has(obj2, key)) {
      return [...acc, { key, status: 'added', newValue }];
    }
    return [...acc, { key, status: 'deleted', oldValue }];
  }, []);

  return result;
};
export default buildAst;
