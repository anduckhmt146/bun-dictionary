import db from './mysql';
import fs from 'fs';
import path from 'path';

const autoMigrate = async () => {
  try {
    // Read the SQL file
    const sqlFilePath = path.resolve(__dirname, '../migrations/init.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');

    // Execute the SQL script
    await db.query(sql);
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

export default autoMigrate;
