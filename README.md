# OpenAPI User API

A RESTful API built with Hono and Zod-OpenAPI that provides user management functionality with automatic OpenAPI documentation.

## Features

- Type-safe API endpoints using Zod schemas
- Automatic OpenAPI 3.0 documentation generation
- Built with Hono for edge-ready performance
- Request/response validation

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Documentation

The OpenAPI documentation is automatically generated and available at:

```
http://localhost:3000/doc
```

## About OpenAPI

OpenAPI is a specification for describing RESTful APIs that enables:

- **Standardized Documentation**: Machine-readable API definitions that can be used to generate interactive docs
- **Code Generation**: Automatic client SDK generation for various languages
- **Validation**: Runtime request/response validation against the API specification
- **Tooling Ecosystem**: Integration with testing tools, mock servers, and API gateways

### Common Use Cases

OpenAPI is widely used for:
1. **API Development** - Design-first API development with clear contracts
2. **Client Integration** - Generate client libraries for web/mobile apps
3. **Testing** - Automated API testing against the specification
4. **Monitoring** - Validate API behavior in production
5. **Developer Portals** - Create self-service API documentation

This project implements OpenAPI 3.0 which includes:
- Path/operation definitions
- Parameter validation
- Schema definitions for requests/responses
- Automatic documentation generation

## Endpoints

### GET /users/{id}

Retrieves a user by ID

**Parameters**
- `id` (path parameter, string, min length 3)

**Response**
```json
{
  "id": "123",
  "name": "John Doe",
  "age": 42
}
```

## Deployment

```bash
npm run deploy
```

## Project Structure

- `src/index.ts` - Main application file with route definitions
- `openapispec.yaml` - OpenAPI specification file

## Dependencies

- `@hono/zod-openapi` - For OpenAPI schema validation and route creation
- `zod` - For schema validation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
