const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validateURL = require("../middlewares/url-validator");
const {
  getArticles,
  deleteArticle,
  saveArticle,
} = require("../controllers/articles");

router.get("/", getArticles);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2).max(30),
      title: Joi.string().required().min(2).max(30),
      text: Joi.string().required().min(2).max(30),
      date: Joi.string().required().min(2).max(30),
      source: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
    }),
  }),
  saveArticle,
);

router.delete("/articleId", deleteArticle);

module.exports = router;
