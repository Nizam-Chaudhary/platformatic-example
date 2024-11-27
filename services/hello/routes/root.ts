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
		'/docs/json',
		// { schema: { hide: true } },
		async (request, reply) => {
			return fastify.swagger();
		}
	);
	fastify.get(
		'/example',
		{ schema: { tags: ['Hello'] } },
		async (_request, _reply) => {
			return { hello: fastify.example };
		}
	);
	fastify.get(
		'/',
		{ schema: { tags: ['Hello'] } },
		async (_request, _reply) => {
			return { hello: fastify.example };
		}
	);
}
