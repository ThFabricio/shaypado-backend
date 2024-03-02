# Shaypado Backend

## Projetc Setup

1. Install Node.js for your platform from [Node.js](https://nodejs.org/en/download/)
2. Clone the repository
3. Run `npm install` to install the dependencies
4. Run `npm start` to start the server
5. Opitonal: Install Docker, in between docker and run `docker-compose up` to start the database

## Project Structure

- `src` contains the source code
- `src/routes` contains the API routes
- `src/database` contains the database configuration
- `src/controllers` contains the controllers for the routes
- `src/middleware` contains the middleware for the routes
- `src/services` contains the services for the routes

## Libraries Used

- `express` for the server
- [TypeORM](https://typeorm.io/) for the database

## Commands TypeORM

- `npm run typeorm migration:create src/database/migrations/CreateStudentProfile` to generate a new migration
- `npm run typeorm -- -d ./src/database/data-source.ts migration:run` to run the migrations
- `npm run typeorm -- -d ./src/database/data-source.ts migration:revert` to revert the migrations
