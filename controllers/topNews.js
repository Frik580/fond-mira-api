const TopNews = require('../models/topNews');
const { BadRequest } = require('../errors/badrequest');
const { Forbidden } = require('../errors/forbidden');
const { NotFound } = require('../errors/notfound');
const { ConflictError } = require('../errors/conflicterror');
const {
  BAD_REQUEST,
  NOT_FOUND_TEXT,
  BAD_REQUEST_TEXT,
  CONFLICT_ERROR_IMAGE,
} = require('../utils/errors-message');

const createTopNews = (req, res, next) => {
  const { title, preview, image } = req.body;
  TopNews.create({
    title,
    preview,
    image,
    owner: req.user._id,
  })
    .then((news) => {
      res.status(201).send(news);
    })
    .catch((err) => {
      if (Object.keys(err.keyValue).toString() === 'image.path') {
        next(new ConflictError(CONFLICT_ERROR_IMAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteTopNews = (req, res, next) => {
  TopNews.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(NOT_FOUND_TEXT);
    })
    .then((news) => {
      if (news.owner.toString() === req.user._id) {
        TopNews.deleteOne(news)
          .then(() => res.status(200).send(news))
          .catch(next);
      } else {
        throw new Forbidden();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(BAD_REQUEST_TEXT));
      } else {
        next(err);
      }
    });
};

const getAllTopNews = (req, res, next) => {
  TopNews.find({})
    .then((news) => res.status(200).send(news))
    .catch(next);
};

module.exports = {
  createTopNews,
  deleteTopNews,
  getAllTopNews,
};
