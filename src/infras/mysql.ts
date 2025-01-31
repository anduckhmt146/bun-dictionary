import mysql from 'mysql2/promise';
import config from '../config/config';

const { host, user, password, database } = config.mysql;

// Async function to establish connection to the database
const connectToDatabase = async (): Promise<mysql.Connection> => {
  try {
    const db = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });
    console.log(`Connected to the ${config.environment} MySQL database`);
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

// Connect to the database and export it
const db = await connectToDatabase();
export default db;
