// import ini from 'ini';
import yaml from 'js-yaml';

const parser = {
  json: JSON.parse,
  // ini: ini.parse,
  yml: yaml.safeLoad,
};
export default (data, extention) => parser[extention](data);
