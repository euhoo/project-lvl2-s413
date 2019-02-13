import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  json: JSON.parse,
  ini: ini.parse,
  yml: yaml.safeLoad,
};
export default (data, extention) => parser[extention](data);
