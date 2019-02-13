// import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const parser = {
  json: JSON.parse,
  // ini: ini.parse,
  yaml: yaml.safeLoad,
};
export default (filePath) => {
  const extention = path.extname(filePath).slice(1).toLowerCase();
  return parser[extention];
};
