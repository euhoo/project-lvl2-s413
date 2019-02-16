import tree from './tree';
import plain from './plain';

const render = {
  tree,
  plain,
  json: JSON.stringify,
};

export default (ast, type) => render[type](ast);
