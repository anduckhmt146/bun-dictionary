import fs from 'fs';
import yaml from 'js-yaml';
import mysql from 'mysql2/promise';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';

const configFile =
  environment === 'production' ? 'config/production.yaml' : 'config/dev.yaml';

const configFilePath = path.resolve(configFile);

// Read and parse the config file
const config = yaml.load(fs.readFileSync(configFilePath, 'utf8')) as {
  mysql: { host: string; user: string; password: string; database: string };
};

const { host, user, password, database } = config.mysql;

// Async function to establish connection to the database
const connectToDatabase = async () => {
  try {
    const db = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });
    console.log(`Connected to the ${environment} MySQL database`);
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Connect to the database and export it
const db = await connectToDatabase();
export default db;
