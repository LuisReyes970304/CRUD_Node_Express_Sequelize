# CRUD Node Express Sequelize

A REST API built with **Node.js**, **TypeScript**, **Express 5** and **Sequelize** (PostgreSQL), containerized with **Docker Compose**. The project follows a layered architecture (`routes → controllers → services → repositories → models`), uses **JWT** for authentication and **bcrypt** for password hashing, and exposes interactive documentation through **Swagger**.

## Tech Stack

- **Runtime:** Node.js 24 (Alpine, via Docker)
- **Language:** TypeScript (executed directly with `tsx`, no build step)
- **Framework:** Express 5
- **ORM:** Sequelize 6 + `pg` driver
- **Database:** PostgreSQL 17 (Alpine)
- **Auth:** `jsonwebtoken` (JWT) + `bcrypt`
- **Docs:** `swagger-jsdoc` + `swagger-ui-express`
- **Containerization:** Docker & Docker Compose

## Project Structure

```
CRUD_Node_Express_Sequelize/
├── docker-compose.yml        # Orchestrates the "app" and "db" services
├── .env.example               # Template of required environment variables
└── app/
    ├── Dockerfile              # node:24-alpine image, exposes port 3015
    ├── index.ts                 # App entry point (Express bootstrap)
    ├── tsconfig.json
    ├── package.json
    └── src/
        ├── config/
        │   └── database.ts       # Sequelize instance + server host/port
        ├── controllers/
        │   ├── auth.controller.ts
        │   └── user.controller.ts
        ├── doc/
        │   ├── swagger.ts        # OpenAPI base definition
        │   └── DOC.md            # Extra notes (psql access, seeder command)
        ├── dto/
        │   ├── auth.dto.ts       # LoginDto, JwtPayload, AuthResponseDto
        │   └── user.dto.ts       # UserCreationDto, UserUpdateDto, UpdateToAdmin
        ├── middleware/
        │   └── auth.middleware.ts # verifyToken / authorizeRoles
        ├── models/
        │   └── user.model.ts      # Sequelize "User" model (paranoid/soft-delete)
        ├── repository/
        │   ├── auth.respository.ts
        │   ├── user.repository.ts
        │   └── interface/         # Repository contracts
        ├── seeder/
        │   └── user.seeder.ts     # Idempotent seed of fixed demo users
        ├── services/
        │   ├── auth.service.ts
        │   ├── users.service.ts
        │   └── interface/         # Service contracts
        └── utils/
            ├── bcrypt.util.ts     # passwordHasher / passwordVerfier
            └── jwt.util.ts        # generateToken / verifyToken
```

## Features

- **User CRUD**
  - Create a user (`POST /user/create_user`) — new users are always created with the `user` role.
  - List all users (`GET /user/get_users`) — protected, `admin` role only.
  - Update a user's name/password (`PATCH /user/update_user/:id`).
  - Soft-delete a user (`DELETE /user/delete/:id`) — protected, `admin` role only.
  - Restore a soft-deleted user (`PATCH /user/restore/:id`) — protected, `admin` role only.
- **Authentication**
  - Login (`POST /auth/login`) validates email/password against the hashed password and returns a JWT plus public user data.
- **Authorization middleware**
  - `verifyToken` validates the `Authorization: Bearer <token>` header.
  - `authorizeRoles(...roles)` restricts a route to specific roles (e.g. `admin`).
- **Soft delete** implemented through Sequelize's `paranoid: true` option on the `User` model.
- **Seeder** with four fixed demo users (`admin`, `develop`, `qa`, `user` roles) that is safe to re-run (uses `findOrCreate`).
- **Swagger UI** available at `/docs` once the server is running.

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose (recommended, no local Node/Postgres install needed).
- Or, for local development without Docker: Node.js 24+ and a running PostgreSQL 17 instance.

## Environment Variables

Copy `.env.example` to `.env` in the project root and adjust as needed:

```env
SERVER_CONTAINER_NAME=crud-application
SERVER_PORT=3015
SERVER_URL=http://localhost
SERVER_CPU_LIMIT=2
SERVER_MEM_LIMIT=512MB

POSTGRES_USER=LuisReyes979394
POSTGRES_DB=postgres
POSTGRES_PASSWORD=123456

POSTGRES_HOST=db
POSTGRES_PORT=5432
DB_CPU_LIMIT=2
DB_MEN_LIMIT=512MB

JWT_SECRET=change_this_super_secret_key
JWT_EXPIRES_IN=1h
```

> `POSTGRES_HOST` must be `db` when running through Docker Compose (the service name), or `localhost` if you're running Postgres locally outside Docker.

## Running with Docker Compose

```bash
# 1. Clone the repository
git clone https://github.com/LuisReyes970304/CRUD_Node_Express_Sequelize.git
cd CRUD_Node_Express_Sequelize

# 2. Create your .env file
cp .env.example .env

# 3. Build and start the containers (app + postgres db)
docker compose up --build
```

The `app` container runs `npm run start`, which chains `npm run seed` (populates the four demo users) and then `npm run dev` (starts the API with `tsx --watch`).

Once running:
- API base URL: `http://localhost:3015`
- Swagger docs: `http://localhost:3015/docs`

To run the seeder again manually against a running container:

```bash
docker compose exec app npm run seed
```

To inspect the database directly:

```bash
docker exec -it crud-application-db psql -U LuisReyes979394 -d postgres
\dt
\d "Users"
SELECT * FROM "Users";
```

## Running Locally (without Docker)

```bash
cd app
npm install
npm run seed   # optional: seed demo users
npm run dev    # starts the API with tsx --watch
```

Make sure your `.env` points `POSTGRES_HOST` at a reachable Postgres instance.

## Available npm Scripts (`app/package.json`)

| Script         | Description                                             |
|----------------|-----------------------------------------------------------|
| `npm run dev`  | Starts the server with `tsx --watch index.ts`             |
| `npm run seed` | Runs the user seeder (`src/seeder/user.seeder.ts`)         |
| `npm run start`| Runs `seed` then `dev` (used by the Docker container)      |

## API Endpoints

### Auth

| Method | Endpoint        | Auth required | Description                                    |
|--------|-----------------|:--------------:|-------------------------------------------------|
| POST   | `/auth/login`   | No             | Authenticates a user, returns a JWT + user info. |

### Users

| Method | Endpoint                    | Auth required | Role   | Description                                |
|--------|------------------------------|:--------------:|--------|---------------------------------------------|
| POST   | `/user/create_user`          | No             | —      | Creates a new user (always as role `user`). |
| GET    | `/user/get_users`            | Yes            | admin  | Returns all users.                          |
| PATCH  | `/user/update_user/:id`      | No             | —      | Updates a user's name and/or password.      |
| DELETE | `/user/delete/:id`           | Yes            | admin  | Soft-deletes a user.                        |
| PATCH  | `/user/restore/:id`          | Yes            | admin  | Restores a soft-deleted user.               |

> Note: as of the current source, `update_user` is not guarded by `verifyToken`/`authorizeRoles`, unlike `get_users`, `delete`, and `restore`.

### Example requests

**Login**
```bash
curl -X POST http://localhost:3015/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"Admin123!"}'
```

**Create user**
```bash
curl -X POST http://localhost:3015/user/create_user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"jane_password"}'
```

**Get all users (requires admin JWT)**
```bash
curl http://localhost:3015/user/get_users \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Seeded Demo Users

The seeder (`src/seeder/user.seeder.ts`) creates the following users if they don't already exist (matched by `name`):

| Name        | Email                     | Password        | Role     |
|-------------|----------------------------|------------------|----------|
| Admin       | admin@admin.com            | Admin123!        | admin    |
| Luis Reyes  | luisreyescaro@gmail.com    | LuisDev2026!     | develop  |
| QA tester   | qatester@gmail.com         | QaTest2026!      | qa       |
| Demo User   | user@gmail.com             | DemoUser2026!    | user     |

## Data Model

**User**

| Field      | Type    | Notes                          |
|------------|---------|----------------------------------|
| id         | INTEGER | Primary key, auto-increment       |
| name       | STRING  | Required                          |
| email      | STRING  | Required, unique                  |
| password   | STRING  | Required, stored as a bcrypt hash |
| role       | STRING  | Required (`admin`, `develop`, `qa`, `user`, etc.) |
| createdAt / updatedAt | DATE | Managed automatically (`timestamps: true`) |
| deletedAt  | DATE    | Set on soft-delete (`paranoid: true`) |
