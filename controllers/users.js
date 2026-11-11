const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/not-found-error");
const InvalidDataError = require("../errors/invalid-data-error");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError("Error buscando usuarios");
    })
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningún usuario con ese id");
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    throw new InvalidDataError(
      "Uno de los campos se rellenó de forma incorrecta",
    );
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ name, email, password: hash });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new ConflictError("Ya existe un usuario con ese correo electrónico"),
        );
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new InvalidDataError("No se ha proporcionado uno o más campos");
  }

  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch(next);
};
