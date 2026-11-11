const express = require("express");

const PORT = 3000;
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/newsexp");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { login, createUser } = require("./controllers/users");
const { errors } = require("celebrate");
const validateUser = require("./middlewares/user-validator");

app.use(express.json());

app.use(requestLogger);

app.post("/signin", validateUser, login);
app.post("/signup", validateUser, createUser);

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

app.use(errorLogger);
app.use(errors());
app.use((err, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has ocurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}`);
});
