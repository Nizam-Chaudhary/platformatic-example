import fastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import { fastifyPlugin } from "fastify-plugin";

export default fastifyPlugin((fastify, opts, done) => {
    fastify.register(fastifySwagger, swaggerOptions);

    done();
});

export const swaggerOptions: SwaggerOptions = {
    openapi: {
        openapi: "3.0.3",
        info: {
            title: `Platformatic Example App`,
            description: `Platformatic Example App`,
            version: "1.0.0",
        },
    },
};
