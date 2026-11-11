const Article = require("../models/article");

const NotFoundError = require("../errors/not-found-error");
const InvalidDataError = require("../errors/invalid-data-error");

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .orFail(() => {
      throw new NotFoundError("Error buscando artículos");
    })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.saveArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user.id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningún artículo con ese ID");
    })
    .then((card) => {
      if (card.owner.toString() !== req.user.id) {
        throw new ForbiddenError("No tienes permiso para eliminar");
      }
      return Article.deleteOne();
    })
    .then((card) => res.send(card))
    .catch(next);
};
