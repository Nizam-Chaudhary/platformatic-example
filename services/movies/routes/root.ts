/// <reference path="../global.d.ts" />
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import example from '../plugins/example';

declare module 'fastify' {
  interface FastifyInstance {
    example: string;
  }
}

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get('/example', async (request, reply) => {
    reply.code(200).send({ hello: 'foobar' });
  });

  fastify.get('/hello', async (request, reply) => {
    reply.code(200).send({ message: 'Hello, World!' });
  });
}
