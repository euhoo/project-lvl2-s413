import tree from './tree';
import plain from './plain';

const render = {
  tree,
  plain,
  json: JSON.stringify,
};

export default (arr, type) => render[type](arr);
