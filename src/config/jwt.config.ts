export default {
  secret: process.env.API_ACCESS_TOKEN_SECRET,
  signOptions: {
    expiresIn: `${process.env.API_ACCESS_TOKEN_TTL_IN_MINUTES}m`,
  },
};
