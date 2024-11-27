import { fastifyBasicAuth } from '@fastify/basic-auth';
import fastifySwagger, { SwaggerOptions } from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
	fastify.register(fastifySwagger);
	await fastify.register(fastifyBasicAuth, {
		validate(username, password, req, reply, done) {
			if (username === 'admin' && password === 'admin') {
				done(); // Access granted
			} else {
				done(new Error('Invalid credentials'));
			}
		},
		authenticate: true, // Enforce authentication on routes
	});

	await fastify.register(ScalarApiReference, {
		routePrefix: '/docs',
		// Additional hooks for the API reference routes. You can provide the onRequest and preHandler hooks
		hooks: {
			onRequest: function (request, reply, done) {
				fastify.basicAuth(request, reply, done);
				done();
			},
			preHandler: function (request, reply, done) {
				done();
			},
		},
		configuration: {
			// layout: 'default',
			metaData: {
				title: 'Passman Docs',
				description: 'API documentation of Passman',
				ogDescription: 'API documentation of Passman',
				ogTitle: 'Passman Docs',
				ogImage: 'https://example.com/image.png',
				twitterCard: 'summary_large_image',
				// Add more...
			},
			spec: {
				url: '/documentation/json',
			},
			theme: 'saturn', // alternate, default, moon, purple, solarized, bluePlanet, saturn, kepler, mars, deepSpace, none
			hideDownloadButton: true,
			favicon:
				'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM1N2UzODkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1maWxlLWNvZGUiPjxwYXRoIGQ9Ik0xMCAxMi41IDggMTVsMiAyLjUiLz48cGF0aCBkPSJtMTQgMTIuNSAyIDIuNS0yIDIuNSIvPjxwYXRoIGQ9Ik0xNCAydjRhMiAyIDAgMCAwIDIgMmg0Ii8+PHBhdGggZD0iTTE1IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY3eiIvPjwvc3ZnPg==',
		},
	});
};

// const swaggerOptions: SwaggerOptions = {
// 	openapi: {
// 		openapi: '3.0.3',
// 		info: {
// 			title: `Platformatic API's`,
// 			description: `Platformatic Backend API's`,
// 			version: '1.0.0',
// 		},
// 	},
// };
