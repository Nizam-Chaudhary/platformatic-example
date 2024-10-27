import { expect, test } from 'vitest';

test('example decorator', async (t) => {
  const response = global.server.example;
  expect(response).toStrictEqual('foobar');
});
