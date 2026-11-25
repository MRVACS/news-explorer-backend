const {
  JWT_SECRET = 'dev-secret-key-not-for-production',
  MONGO_URL = 'mongodb://localhost:27017/newsexp',
} = process.env;

module.exports = { JWT_SECRET, MONGO_URL };
