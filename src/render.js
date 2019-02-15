import renderTree from './renders/tree';
import renderPlain from './renders/plain';

const render = {
  tree: renderTree,
  plain: renderPlain,
};

export default (arr, type) => render[type](arr);
