# OpenAPI User API

## Why OpenAPI?

When creating backend APIs, it's challenging for others to understand:
- Available endpoints
- Request/response shapes
- Authentication requirements

OpenAPI solves this by providing:
1. **Standardized Documentation** - Single source of truth for your API
2. **Client Generation** - Auto-generated SDKs for multiple languages
3. **Discoverability** - Humans and machines can understand your API
4. **Tooling Integration** - Works with testing, monitoring, and documentation tools

Learn more: [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)

## Features

- Type-safe API endpoints using [Zod](https://zod.dev/) schemas
- Automatic OpenAPI 3.0 documentation generation
- Built with [Hono](https://hono.dev/) for edge-ready performance
- Request/response validation
- Swagger UI integration

## Project Structure

```
my-app/
├── src/
│   └── index.ts       # Main API implementation
├── generated/         # Auto-generated client code
├── spec.json          # OpenAPI specification
└── README.md
```

## Installation

```bash
npm install
npm install @hono/swagger-ui openapi-typescript-codegen --save-dev
```

## Development

```bash
npm run dev
```

Access endpoints:
- API: `http://localhost:3000`
- Docs: `http://localhost:3000/doc` ([OpenAPI format](https://swagger.io/specification/))
- Swagger UI: `http://localhost:3000/ui` ([Demo](https://petstore.swagger.io/))

## Generating Clients

Using [openapi-typescript-codegen](https://www.npmjs.com/package/openapi-typescript-codegen)

1. First, save the OpenAPI spec:
```bash
curl http://localhost:3000/doc > spec.json
```

2. Generate TypeScript client:
```bash
npx openapi-typescript-codegen --input ./spec.json --output ./generated
```

3. Use the generated client in your projects:
```typescript
import { Client } from './generated';

const client = new Client();
const user = await client.getUsersById('123');
```

## Deployment

```bash
npm run deploy
```

## OpenAPI Specification

The API follows OpenAPI 3.0 standard with:
- Path/operation definitions
- Parameter validation
- Schema definitions
- Automatic documentation

## About Swagger

Swagger is a powerful toolset for working with OpenAPI specifications:

1. **Swagger UI** - Interactive API documentation interface
   - Visually explore API endpoints
   - Try API calls directly from browser
   - View request/response examples

2. **Key Features**
   - Auto-generated from OpenAPI spec
   - Supports authentication testing
   - Response schema visualization
   - Available at `/ui` endpoint

3. **Usage in This Project**
   - Integrated via `@hono/swagger-ui`
   - Automatically stays in sync with API
   - Provides developer-friendly interface

Try it out: `http://localhost:3000/ui`

- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [Hono Swagger UI Integration](https://hono.dev/snippets/swagger-ui)

## Endpoints

### GET /users

Retrieves all users with optional name filter

**Query Parameters**
- `name` (optional, string) - Filter users by name

**Response**
```json
[
  {
    "id": "123",
    "name": "John Doe",
    "age": 42
  }
]
```

### GET /users/{id}

Retrieves a single user by ID

**Path Parameters**
- `id` (required, string, min length 3)

**Response**
```json
{
  "id": "123",
  "name": "John Doe",
  "age": 42
}
```

## Contributing

[GitHub Flow Guide](https://guides.github.com/introduction/flow/)

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
