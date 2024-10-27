import { expect, test } from 'vitest';

test('root', async () => {
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

test('/GET heath-check', async () => {
  const res = await global.server.inject({
    method: 'GET',
    url: '/health-check',
  });

  expect(res.statusCode).toBe(200);
  expect(res.json()).toStrictEqual({
    message: 'OK',
  });
});
