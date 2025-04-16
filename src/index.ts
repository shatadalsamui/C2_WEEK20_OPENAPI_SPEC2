import { z } from '@hono/zod-openapi' // Import zod-openapi library
import { createRoute } from '@hono/zod-openapi' // Import createRoute function
import { OpenAPIHono } from '@hono/zod-openapi' // Import OpenAPIHono class
import { Hono } from 'hono';
import { swaggerUI } from "@hono/swagger-ui"

// Define parameter schema
const ParamsSchema = z.object({
  id: z // Define id parameter
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1212121',
    }),
})

// Define user schema
const UserSchema = z
  .object({ // Define object schema
    id: z.string().openapi({ // Define id property
      example: '123',
    }),
    name: z.string().openapi({ // Define name property
      example: 'John Doe',
    }),
    age: z.number().openapi({ // Define age property
      example: 42,
    }),
  })
  .openapi('User') // Add OpenAPI metadata

// Create a new OpenAPI route definition
const route = createRoute({
  method: 'get',  // Specifies HTTP GET method
  path: '/users/{id}',  // Defines route path with id parameter
  request: {  // Defines request parameters
    params: ParamsSchema,  // Uses the defined parameter schema
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

// Creates new Hono app with OpenAPI support
const app = new OpenAPIHono()

// Registers the route with OpenAPI validation
app.openapi(route, (c) => {
  // Gets validated id parameter
  const { id } = c.req.valid('param')

  return c.json({
    id,
    age: 20,
    name: 'Ultra-man',
  })
})

// The OpenAPI documentation will be available at /doc
// Configures OpenAPI documentation endpoint
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})
app.get('/ui', swaggerUI({ url: '/doc' }))

export default app 