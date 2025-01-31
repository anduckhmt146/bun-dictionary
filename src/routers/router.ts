import { wordHandler } from '../handlers/wordHandler';

export async function router(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  if (path === '/health' && method === 'GET') {
    return new Response('OK', { status: 200 });
  }

  if (path === '/words' && method === 'POST') {
    return wordHandler.handleAddWord(req);
  }

  if (path === '/words' && method === 'GET') {
    return wordHandler.handleSearchWords(req);
  }

  return new Response('Not found', { status: 404 });
}
