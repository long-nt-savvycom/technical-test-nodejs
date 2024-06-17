# technical-test-nodejs

## Mini Game Server

### Prerequisite
1. Docker and docker compose


### Setup Database (If you have postgres database at local, you can skip this step):

1. Copy .env.example file to .env and fill database info
2. Run `docker compose up -d postgresdb` or `docker-compose up -d postgresdb` (for old version)

### Development:

1. Run `npm i` command
2. Comment line `import 'module-alias/register'` in src/index.ts
3. Edit .env file and fill other info
4. Run `npm run swagger-autogen` to generate swagger file
5. Run `npm run watch` command

### Production:

1. Change DB_HOST in .env file to postgresdb (like service name in docker-compose.yml)
2. Enable line `import 'module-alias/register'` in src/index.ts
3. Run `docker compose up -d` or `docker-compose up -d` (for old version)

### Testing

1. Swagger [here](http://localhost:3001/doc)
2. Unit test: `npm run test`

### Incoming feature

1. Refresh token
2. Fix alias path conflict between tsconfig-path and module-alias