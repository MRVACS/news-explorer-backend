const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthorizationError = require('../errors/authorization-error');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  /* console.log("🔐 AUTH - Authorization recibido:", authorization); */
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(
      'Token no proporcionado o proporcionado en el formato incorrecto',
    );
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError(
      'Token no proporcionado o proporcionado en el formato incorrecto',
    );
  }

  req.user = payload; // asigna el payload al objeto de solicitud
  /* console.log("👤 AUTH - req.user:", req.user); */
  next();
};
