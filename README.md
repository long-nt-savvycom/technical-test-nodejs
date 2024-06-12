# technical-test-nodejs

## Mini Game Server

### Prerequisite
1. Docker and docker compose


### Setup Database (If you have postgres database at local, you can skip this step):

1. Copy .env.example file to .env and fill database info
2. Run `docker compose up -d postgresdb` or `docker-compose up -d postgresdb` (for old version)

### Development:

1. Run `npm i` command
2. edit .env file and fill other info
3. Run `npm run watch` command

### Production:

1. Run `docker compose up -d` or `docker-compose up -d` (for old version)

### Postman for testing

1. Download postman import file [here](https://api.postman.com/collections/36261541-52a08469-ef2c-4c96-b72a-c963d34c5f03?access_key=PMAT-01J05XMMRZB0M6YB0QV42DRXE4)
2. Go to Postman and import downloaded file
3. Change SERVER_PORT in .env to 3001 (recommended) or change manually in postman

### Incoming feature

1. Swagger
2. Refresh token
2. Optimize docker file for production