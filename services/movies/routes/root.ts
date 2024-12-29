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
		'/example',
		{ schema: { tags: ['Movies'] } },
		async (request, reply) => {
			reply.code(200).send({ hello: fastify.example });
		}
	);

	fastify.get(
		'/hello',
        {
            schema: {
                tags: ['Movies'] ,
                security: [{ bearerAuth: [] }],
            },
        },
		async (request, reply) => {
		    fastify.log.info(request.headers,'test')
			reply.code(200).send({ message: 'Hello, World!' });
		}
	);

	fastify.get(
		'/documentation/json',
		{ logLevel: 'silent' },
		async (request, reply) => {
			reply.status(200).send(fastify.swagger())
		}
	);

	await fastify.register(sample, { prefix: '/heath-check' });
}
