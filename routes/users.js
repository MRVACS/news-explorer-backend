const router = require('express').Router();
/* const { celebrate, Joi } = require("celebrate"); */

const { getCurrentUser } = require('../controllers/users');

/* router.get("/me", getUsers); */
router.get('/me', getCurrentUser);

module.exports = router;
