import { buildServer } from '@platformatic/service';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { getServer } from '../helper';

let server: Awaited<ReturnType<typeof buildServer>>;

beforeAll(async () => {
  server = await getServer();
});

afterAll(async () => {
  server.close();
});

test('root', async () => {
  const res = await server.inject({
    method: 'GET',
    url: '/example',
  });

  expect(res.statusCode).toBe(200);
  expect(res.json()).toStrictEqual({
    hello: 'foobar',
  });
});

test('hello', async () => {
  const res = await server.inject({
    method: 'GET',
    url: '/hello',
  });

  expect(res.statusCode).toBe(200);
  expect(res.json()).toStrictEqual({
    message: 'Hello, World!',
  });
});
