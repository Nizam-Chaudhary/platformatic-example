import { buildServer } from '@platformatic/service';
import { afterAll, beforeAll, expect, test } from 'vitest';
import example from '../../plugins/example';
import { getServer } from '../helper';

test('root', async () => {
  global.server.register(example);
  const res = await global.server.inject({
    method: 'GET',
    url: '/example',
  });

  expect(res.statusCode).toBe(200);
  expect(res.json()).toStrictEqual({
    hello: 'foobar',
  });
});

test('hello', async () => {
  const res = await global.server.inject({
    method: 'GET',
    url: '/hello',
  });

  expect(res.statusCode).toBe(200);
  expect(res.json()).toStrictEqual({
    message: 'Hello, World!',
  });
});
