const { JWT_SECRET = "dev-secret-key-not-for-production" } = process.env;

module.exports = { JWT_SECRET };
