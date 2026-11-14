const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validateUserLogin,
  validateUserSignup,
} = require('../middlewares/user-validator');
const NotFoundError = require('../errors/not-found-error');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserSignup, createUser);
router.use(auth);
router.use('/users', require('./users'));

router.use('/articles', require('./articles'));

router.use((req, res, next) => next(new NotFoundError('Recurso solicitado no encontrado')));

module.exports = router;
