import renderTree from './renderTree';
import renderPlain from './renderPlain';

const render = {
  tree: renderTree,
  plain: renderPlain,
};

export default (arr, type) => render[type](arr);
