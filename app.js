const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');

const PORT = 3000;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const { MONGO_URL } = require('./utils/config');

mongoose.connect(MONGO_URL);
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(helmet());
const { login, createUser } = require('./controllers/users');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
});
const {
  validateUserLogin,
  validateUserSignup,
} = require('./middlewares/user-validator');

app.use(limiter);
app.use(express.json());

app.use(requestLogger);

app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserSignup, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'An error has ocurred on the server' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}`);
});
