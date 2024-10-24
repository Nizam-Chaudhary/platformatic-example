import { buildServer } from '@platformatic/service';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function getServer() {
  const config = JSON.parse(
    await readFile(join(__dirname, '..', 'platformatic.json'), 'utf8')
  );
  config.server = {
    hostname: 'localhost',
    port: '3042',
  };
  config.server.logger ||= {};
  config.server.logger.level = 'warn';
  config.watch = false;

  const server = await buildServer(config);

  return server;
}
