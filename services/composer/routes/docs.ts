import { FastifyInstance } from 'fastify';

const services = [
	{
		id: null,
		url: '/composer/documentation/json',
	},
	{
		id: 'hello',
		url: '/hello/documentation/json',
	},
	{
		id: 'movies',
		url: '/movies/documentation/json',
	},
];

type PathItem = any;

type CombinedDocs = {
	openapi: string;
	info: {
		title: string;
		description: string;
		version: string;
	};
	servers?: Array<{ url: string; description: string }>;
	paths: Record<string, PathItem>; // Ensure paths is an object with string keys
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'apiKey';
				name: 'Authorization';
				in: 'header';
			};
		};
		schemas: Record<string, any>; // Schema can be more complex, but `any` works as a placeholder
	};
	'x-tagGroups': Array<{ name: string; tags: string[] }>;
};

export default async (fastify: FastifyInstance) => {
	fastify.get('/documentation/json', async () => {
		const combinedDocs: CombinedDocs = {
			openapi: '3.0.3',
			info: {
				title: `Platformatic API's`,
				description: `Platformatic Backend API's`,
				version: '1.0.0',
			},
			paths: {},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'apiKey',
						name: 'Authorization',
						in: 'header',
					},
				},
				schemas: {},
			},

			'x-tagGroups': [
				{
					name: "Default API's",
					tags: ['Default'],
				},
				{
					name: "Movies API's",
					tags: ['Movies', 'Health'],
				},
				{
					name: "Hello API's",
					tags: ['Hello'],
				},
			],
		};

		for (const service of services) {
			try {
				const response = await fastify.inject({
					method: 'GET',
					url: service.url,
				});
				const serviceDoc = JSON.parse(response.payload);
				for (const [path, pathItem] of Object.entries(serviceDoc.paths)) {
					// Add the service ID prefix (e.g., '/hello', '/movies')
					const prefixedPath =
						service.id != null ? `/${service.id}${path}` : path;
					// Add the new path with the service ID prefix to the combined docs
					combinedDocs.paths[prefixedPath] = pathItem;

					for (const method in combinedDocs.paths[path]) {
						addDefaultTag(combinedDocs.paths[path][method]);
					}
				}
				combinedDocs.components.schemas = {
					...combinedDocs.components.schemas,
					...serviceDoc.components.schemas,
				};
			} catch (error) {
				console.error(`Error fetching ${service.url}:`, error);
			}
		}

		return combinedDocs;
	});

	fastify.get(
		'/composer/documentation/json',
		{ schema: { tags: ['Default'] } },
		async () => {
			return fastify.swagger();
		}
	);

	fastify.post('/', async () => {
		return 'ok';
	});
};

function addDefaultTag(route: any) {
	// If 'tags' is missing or null, assign a default tag
	if (!route.tags || route.tags === null) {
		route.tags = ['Default'];
	}
}
