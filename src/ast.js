import _ from 'lodash';

const buildAst = (obj = {}, obj2 = {}) => {
  const keys = _.union(Object.keys(obj), Object.keys(obj2));

  const result = keys.reduce((acc, key) => {
    const valueBefore = obj[key];
    const valueAfter = obj2[key];
    if (_.has(obj2, key) && _.has(obj, key)) {
      if ((typeof valueAfter === 'object') && (typeof valueBefore === 'object')) {
        return [...acc, { key, status: 'haveChildren', value: buildAst(valueBefore, valueAfter) }];
      }
      if (!(valueBefore === valueAfter)) {
        return [...acc, {
          key, status: 'addChanged', value: valueAfter, oldValue: valueBefore,
        }, { key, status: 'delChanged', value: valueBefore }];
      }
      return [...acc, { value: valueBefore, key, status: 'unchanged' }];
    } if (_.has(obj2, key)) {
      return [...acc, { key, status: 'add', value: valueAfter }];
    }
    return [...acc, { key, status: 'del', value: valueBefore }];
  }, []);

  return result;
};
export default buildAst;
