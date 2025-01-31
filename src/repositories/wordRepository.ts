import db from '../infras/mysql';
import type { Word } from '../models/word';

export interface WordRepository {
  insertWord(word: string): Promise<{ word: string } | { error: string }>;
  searchWordsByPrefix(prefix: string): Promise<Word[]>;
}

export const wordRepository: WordRepository = {
  async insertWord(
    word: string
  ): Promise<{ word: string } | { error: string }> {
    try {
      await db.query('INSERT INTO words (word) VALUES (?)', [word]);
      return { word };
    } catch (error) {
      console.error('Error inserting word:', error);
      return { error: 'Failed to insert word.' };
    }
  },

  async searchWordsByPrefix(prefix: string): Promise<Word[]> {
    try {
      const data = await db.query('SELECT * FROM words WHERE word LIKE ?', [
        `${prefix}%`,
      ]);
      const [rows] = data;
      return (rows as { id: number; word: string; created_at: string }[]).map(
        (row) => ({
          id: row.id,
          word: row.word,
          created_at: Math.floor(new Date(row.created_at).getTime() / 1000),
        })
      );
    } catch (error) {
      console.error('Error searching words by prefix:', error);
      return [];
    }
  },
};
