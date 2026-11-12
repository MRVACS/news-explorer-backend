const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateArticle = require('../middlewares/article-validator');
const {
  getArticles,
  deleteArticle,
  saveArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', validateArticle, saveArticle);

router.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({ articleId: Joi.string().hex().length(24) }),
  }),
  deleteArticle,
);

module.exports = router;
