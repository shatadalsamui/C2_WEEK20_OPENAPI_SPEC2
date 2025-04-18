# OpenAPI User API

This project provides:
1. A REST API for user data
2. Auto-generated documentation
3. Type-safe client SDK
4. Interactive API explorer

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

## Client SDK Generation

An auto-generated client is:
1. Ready-to-use API wrapper
2. Created from OpenAPI spec
3. Provides typed methods
4. Handles HTTP requests

## About Auto-Generated Clients

Auto clients provide:
- **Type safety**: Enforced parameter/response types
- **Efficiency**: Reduces manual API coding
- **Sync**: Always matches API version
- **Universal**: Works with any frontend

Generated from `spec.json`, these handle:
- Service creation
- HTTP communication
- Error handling

### 1. Generate TypeScript Client
```bash
npx openapi-typescript-codegen --input ./spec.json --output ./generated
```

### 2. Using the Generated Client

```typescript
// Node.js/React Usage Example
import { UsersService } from './generated';

const api = new UsersService({
  BASE: 'http://localhost:3000'
});

// Get user by ID
const user = await api.getUsersById('123'); 

// Get all users
const users = await api.getUsers();
```

### 3. Available Methods
- `getUsers()` - Fetch all users
- `getUsersById(id)` - Fetch single user

### 4. Client Features
- Type-safe requests/responses
- Error handling
- Configurable base URL

## OpenAPI Specification

The API follows OpenAPI 3.0 standard with:
- Path/operation definitions
- Parameter validation
- Schema definitions
- Automatic documentation

## About Swagger

Swagger tools for OpenAPI:

**UI Features**
- Interactive endpoint explorer
- In-browser API testing
- Request/response examples

**Key Benefits**
- Auto-generated from spec
- Supports auth testing
- Schema visualization
- Available at `/ui`

**Implementation**
- Added via `@hono/swagger-ui`
- Always API-synced
- Clean interface

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