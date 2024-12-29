import { FastifyInstance } from 'fastify';
import { isErrorResult, merge } from 'openapi-merge';
import { Agent, request } from 'undici';
const FastifyUndiciDispatcher = require('fastify-undici-dispatcher')

export default async (fastify: FastifyInstance) => {
    const dispatcher = new FastifyUndiciDispatcher({
        dispatcher: new Agent(),
        domain: '.local'
    })

    dispatcher.route('composer', fastify)

	fastify.get('/openapi.json', async (req, reply) => {
	    const mainOpenApiSpec = fastify.swagger() as any;

		try {
		    const [moviesOpenApiSpec, helloOpenApiSpec] = await Promise.all([
                (await request('http://composer.local/movies/documentation/json', {dispatcher: dispatcher})).body.text(),
                (await request('http://composer.local/hello/documentation/json', {dispatcher: dispatcher})).body.text()
            ])

            const mergeResult = merge([
                {
                    oas: mainOpenApiSpec,
                },
                {
                    oas: JSON.parse(moviesOpenApiSpec),
                    pathModification: {
                        prepend: '/movies'
                    }
                },
                {
                    oas: JSON.parse(helloOpenApiSpec),
                    pathModification: {
                        prepend: '/hello'
                    }
                }
            ])

            if(isErrorResult(mergeResult)) {
                return mainOpenApiSpec
            } else {
                return mergeResult.output
            }


        } catch (error: any) {
            return mainOpenApiSpec
        }
    });
};
