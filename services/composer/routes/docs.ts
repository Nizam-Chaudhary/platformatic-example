import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
	fastify.get('/docs/json', async () => {
		const swaggerDocs = fastify.swagger();

		// @ts-ignore
		swaggerDocs['components'] = {
			securitySchemes: {
				JWTAuth: {
					type: 'apiKey',
					name: 'Authorization',
					in: 'header',
				},
			},
		};
		// @ts-ignore
		swaggerDocs['x-tagGroups'] = tagGroups;
		console.log('docs', swaggerDocs);
		return swaggerDocs;
	});
};

const tagGroups = [
	{
		name: "Default API's",
		tags: ['Default'],
	},
	{
		name: 'Movies',
		tags: ['Movies'],
	},
	{
		name: 'Hello',
		tags: ['Hello'],
	},
];
