/// <reference path="../global.d.ts" />
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

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
		'/example',
		{ schema: { tags: ['Hello'] } },
		async (request, reply) => {
			return { hello: fastify.example };
		}
	);

	fastify.get(
		'/documentation/json',
		{ logLevel: 'silent' },
		async (request, reply) => {
			reply.status(200).send(fastify.swagger())
		}
	);
}
