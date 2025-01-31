import { wordService } from '../services/wordService';

export interface WordHandler {
  handleAddWord(req: Request): Promise<Response>;
  handleSearchWords(req: Request): Promise<Response>;
}

export const wordHandler: WordHandler = {
  async handleAddWord(req: Request): Promise<Response> {
    try {
      const { word } = await req.json();
      if (!word) {
        return new Response('Word is required.', { status: 400 });
      }

      const result = await wordService.insertWord(word);

      if ('error' in result) {
        return new Response(JSON.stringify(result), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(result), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error adding word:', error);
      return new Response('Failed to add word.', { status: 500 });
    }
  },

  async handleSearchWords(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const searchTerm = url.searchParams.get('search') || '';

    if (!searchTerm) {
      return new Response('Search query parameter is required.', {
        status: 400,
      });
    }

    try {
      const words = await wordService.searchWordsByPrefix(searchTerm);
      return new Response(JSON.stringify(words), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error searching words:', error);
      return new Response('Failed to search words.', { status: 500 });
    }
  },
};
