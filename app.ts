import { serve } from 'bun';
import { router } from './src/routers/router';
import config from './src/config/config';
import autoMigrate from './src/infras/autoMigrate';

const HTTP_PORT = config.service.http_port;

// Run the database migration script
autoMigrate();

serve({
  fetch: router,
  port: HTTP_PORT,
});

console.log(`Server running at ${HTTP_PORT}`);
