import { wordService } from '../services/wordService';
import { ErrorResponse, SuccessResponse } from '../utils/response';

export interface WordHandler {
  handleAddWord(req: Request): Promise<Response>;
  handleSearchWords(req: Request): Promise<Response>;
}

export const wordHandler: WordHandler = {
  async handleAddWord(req: Request): Promise<Response> {
    try {
      const { word } = await req.json();
      if (!word) {
        return ErrorResponse(400, 'Word is required.');
      }

      const result = await wordService.insertWord(word);

      if ('error' in result) {
        console.error('Error adding word:', result.error);
        return ErrorResponse(500, 'Internal Server Error in add word');
      } else {
        return SuccessResponse(200, result);
      }
    } catch (error) {
      console.error('Error adding word:', error);
      return ErrorResponse(500, 'Internal Server Error in add word');
    }
  },

  async handleSearchWords(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const searchTerm = url.searchParams.get('search') || '';

    if (!searchTerm) {
      return ErrorResponse(400, 'Search term is required.');
    }

    try {
      const words = await wordService.searchWordsByPrefix(searchTerm);
      return SuccessResponse(200, words);
    } catch (error) {
      console.error('Error searching words:', error);
      return ErrorResponse(500, 'Internal Server Error in search words');
    }
  },
};
