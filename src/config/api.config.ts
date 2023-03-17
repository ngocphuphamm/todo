export default {
  PORT: process.env.API_PORT || 3000,
  HOST: process.env.API_HOST || 'localhost',
  ACCESS_TOKEN_SECRET: process.env.API_ACCESS_TOKEN_SECRET || 'mysecret',
  ACCESS_REFRESH_TOKEN_SECRET:
    process.env.API_ACCESS_REFRESH_TOKEN_SECRET || 'myrefreshsecret',
  ACCESS_REFRESH_TOKEN_SECRET_IN_DAYS:
    process.env.API_ACCESS_REFRESH_TOKEN_SECRET_IN_DAYS || 7,
  ACCESS_TOKEN_TTL_IN_MINUTES: process.env.API_ACCESS_TOKEN_SECRET || 60,
  ACCESS_TOKEN_HEADER: process.env.API_ACCESS_TOKEN_HEADER || 'Authorization',
  LOGIN_USERNAME_FIELD: process.env.API_LOGIN_USERNAME_FIELD || 'username',
  LOGIN_PASSWORD_FIELD: process.env.API_LOGIN_PASSWORD_FIELD || 'password',
  LIMIT_NUMBER: process.env.API_LIMIT_NUMBER || 10,
  DURATION_NUMBER: process.env.API_DURATION_NUMBER || 30,
  LOG_ENABLE: process.env.LOG_ENABLE || true,
};
