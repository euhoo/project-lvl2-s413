import tree from './tree';
import plain from './plain';

const renderer = {
  tree,
  plain,
  json: JSON.stringify,
};

export default (ast, type) => renderer[type](ast);
