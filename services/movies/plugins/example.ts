/// <reference path="../global.d.ts" />
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

export default fastifyPlugin(
  (fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) => {
    fastify.decorate('example', 'foobar');

    done();
  }
);
