import { buildServer } from '@platformatic/service';
import { afterAll, beforeAll, expect, test } from 'vitest';
import {
  default as example,
  default as examplePlugin,
} from '../../plugins/example';
import { getServer } from '../helper';

let server: Awaited<ReturnType<typeof buildServer>>;

beforeAll(async () => {
  server = await getServer();
});

afterAll(() => {
  server.close();
});

test('example decorator', async () => {
  server.register(example);
  expect(server.example).toEqual('foobar');
});
