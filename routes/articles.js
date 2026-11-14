const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateArticle = require('../middlewares/article-validator');
const {
  getArticles,
  deleteArticle,
  saveArticle,
} = require('../controllers/articles');
const { getCurrentUser } = require('../controllers/users');

router.get('/', getArticles);
router.post('/', validateArticle, saveArticle);

router.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({ articleId: Joi.string().hex().length(24) }),
  }),
  deleteArticle,
);

router.get('/me', getCurrentUser);

module.exports = router;
