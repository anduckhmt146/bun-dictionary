import { serve } from 'bun';
import { router } from './src/routers/router';
import config from './src/config/config';

const HTTP_PORT = config.service.http_port;

serve({
  fetch: router,
  port: HTTP_PORT,
});

console.log(`Server running at ${HTTP_PORT}`);
