// src/tests/setup.ts

import { FastifyInstance } from 'fastify';
import { afterAll, beforeAll } from 'vitest';
import { getServer } from './helper'; // Assuming helper contains logic to get the server instance

// Extend the global scope by using `declare global`
declare global {
  // Declare global `server` as a FastifyInstance
  var server: FastifyInstance;
}

beforeAll(async () => {
  // Start the server and assign it to the global variable
  global.server = await getServer();
});

afterAll(() => {
  // Close the server after all tests
  global.server.close();
});
