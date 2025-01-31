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
      const [rows] = await db.query(
        'SELECT word FROM words WHERE word LIKE ?',
        [`${prefix}%`]
      );

      return (rows as { word: string }[]).map((row) => ({ word: row.word }));
    } catch (error) {
      console.error('Error searching words by prefix:', error);
      return [];
    }
  },
};
