# Sneakers & T-Shirts API — Boilerplate

This is a lightweight, scalable boilerplate for an e-commerce backend (sneakers & t-shirts). It uses:

- pnpm (target: >=10.15)
- Node + TypeScript
- Express v5
- Zod for runtime validation
- Prisma for DB access (schema provided without models)
- Docker Compose with MySQL and phpMyAdmin
- Best-practice layout for scalability

Note: Prisma schema is included but contains no models (per request).

Quick start (local, with Docker)

1. Copy the repository locally.
2. Create a `.env` file from `.env.example`.
3. Start services:
   - with Docker: `docker compose up --build` (or `docker-compose up --build` if you use that CLI).
   - this will start MySQL, phpMyAdmin and build the Node app image.

Inside the app container `app`, pnpm will be used (Dockerfile installs pnpm@10.15).

Dev (without Docker)
1. Install pnpm >= 10.15 locally.
2. Run `pnpm install`.
3. Start dev server: `pnpm dev`.

Prisma
- Prisma client is configured. Run `pnpm prisma:generate` after adding models to `prisma/schema.prisma`.
- There's no migration files included (no models present). Add models then run `pnpm prisma:migrate dev` (or `prisma migrate` commands) as required.

Important notes
- You requested MySQL 9.4. That tag may not exist on Docker Hub at the time you run this; if docker-compose fails to pull `mysql:9.4`, change the `image:` in `docker-compose.yml` to a supported MySQL image (for example `mysql:8.0`).
- All docker service configuration (ports, credentials) is read from environment variables via `.env`. The `.env` file is not included (see `.env.example`).

Project layout (important files)
- src/
  - server.ts — small bootstrap for the HTTP server
  - app.ts — Express app registration
  - routes/ — route registration
  - controllers/ — controllers
  - middlewares/ — common middleware
  - prisma/ — Prisma client helper
  - schemas/ — Zod schema examples
  - utils/ — helpers (logger, responses)
- prisma/schema.prisma — datasource + generator (no models by request)
- docker-compose.yml — MySQL + phpMyAdmin + app
- Dockerfile — builds the app image and installs pnpm@10.15
- .env.example — environment variables used by docker and app

If you want, I can:
- Add starter Prisma models for Products, Users, Orders.
- Wire up authentication and example endpoints (CRUD).
- Add CI, tests, and linting rules.
