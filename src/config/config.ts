import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const environment = process.env.NODE_ENV || 'local';
const configFile = `config/${environment}.yaml`;
const configFilePath = path.resolve(configFile);

// Read and parse the config file
const config = yaml.load(fs.readFileSync(configFilePath, 'utf8')) as {
  mysql: { host: string; user: string; password: string; database: string };
  service: { http_port: number };
};

export default { ...config, environment };
