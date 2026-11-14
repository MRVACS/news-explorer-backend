const express = require('express');
const helmet = require('helmet');

const PORT = 3000;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { MONGO_URL } = require('./utils/config');
const limiter = require('./utils/limiter');

mongoose.connect(MONGO_URL);
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(helmet());

app.use(limiter);
app.use(express.json());

app.use(requestLogger);

app.use(router);
/* app.post("/signin", validateUserLogin, login);
app.post("/signup", validateUserSignup, createUser);
app.use(auth);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
 */
app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}`);
});
