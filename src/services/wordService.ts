import { wordRepository } from '../repositories/wordRepository';
import type { Word } from '../models/word';

export class WordService {
  async insertWord(
    word: string
  ): Promise<{ word: string } | { error: string }> {
    return wordRepository.insertWord(word);
  }

  async searchWordsByPrefix(prefix: string): Promise<Word[]> {
    return wordRepository.searchWordsByPrefix(prefix);
  }
}

export const wordService = new WordService();
