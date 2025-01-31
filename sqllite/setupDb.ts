// setupDb.ts
import { Database } from 'bun:sqlite';

// Initialize the SQLite database
const db = new Database('dictionary.db');

// Create a table to store words
db.exec(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL UNIQUE
  );
`);

console.log('Database setup complete.');
