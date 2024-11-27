/// <reference path="../global.d.ts" />
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import sample from './sample';

declare module 'fastify' {
	interface FastifyInstance {
		example: string;
	}
}

export default async function (
	fastify: FastifyInstance,
	opts: FastifyPluginOptions
) {
	fastify.get(
		'/docs/json',
		{ schema: { hide: true } },
		async (request, reply) => {
			return fastify.swagger();
		}
	);
	fastify.get(
		'/example',
		{ schema: { tags: ['Movies'] } },
		async (request, reply) => {
			reply.code(200).send({ hello: fastify.example });
		}
	);

	fastify.get(
		'/hello',
		{ schema: { tags: ['Movies'] } },
		async (request, reply) => {
			reply.code(200).send({ message: 'Hello, World!' });
		}
	);

	await fastify.register(sample, { prefix: '/heath-check' });
}
