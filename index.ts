import { serve } from 'bun';
import { wordHandler } from './src/handlers/wordHandler';

serve({
  fetch(req: Request) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    if (path === '/words' && method === 'POST') {
      return wordHandler.handleAddWord(req);
    }

    if (path === '/words' && method === 'GET') {
      return wordHandler.handleSearchWords(req);
    }

    return new Response('Not found', { status: 404 });
  },
  port: 3000,
});

console.log('Server running at http://localhost:3000');
