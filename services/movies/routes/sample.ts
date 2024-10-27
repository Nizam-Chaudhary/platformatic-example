/// <reference path="../global.d.ts" />
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get('/health-check', async (request, reply) => {
    reply.code(200).send({ message: 'OK' });
  });
}