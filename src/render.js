import tree from './renders/tree';
import plain from './renders/plain';

const render = {
  tree,
  plain,
  json: JSON.stringify,
};

export default (arr, type) => render[type](arr);
