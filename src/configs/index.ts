export default {
  server: {
    port: Number(process.env.SERVER_PORT) || 3000
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'test',
    password: process.env.DB_ROOT_PASSWORD || 'test',
    database: process.env.DB_NAME || 'test',
  },
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiredIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    refreshTokenExpiredIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
  },
};
