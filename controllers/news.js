const News = require('../models/news');
const { BadRequest } = require('../errors/badrequest');
const { Forbidden } = require('../errors/forbidden');
const { NotFound } = require('../errors/notfound');
const { ConflictError } = require('../errors/conflicterror');
const {
  BAD_REQUEST,
  NOT_FOUND_TEXT,
  BAD_REQUEST_TEXT,
  CONFLICT_ERROR_SLUG,
  CONFLICT_ERROR_IMAGE,
} = require('../utils/errors-message');

const createNews = (req, res, next) => {
  const {
    createdAt, title, slug, tags, preview, article, image,
  } = req.body;
  News.create({
    createdAt,
    title,
    slug,
    tags,
    preview,
    article,
    image,
    owner: req.user._id,
  })
    .then((news) => {
      res.status(201).send(news);
    })
    .catch((err) => {
      if (Object.keys(err.keyValue).toString() === 'slug') {
        next(new ConflictError(CONFLICT_ERROR_SLUG));
      } else if (Object.keys(err.keyValue).toString() === 'image.path') {
        next(new ConflictError(CONFLICT_ERROR_IMAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteNews = (req, res, next) => {
  News.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(NOT_FOUND_TEXT);
    })
    .then((news) => {
      if (news.owner.toString() === req.user._id) {
        News.deleteOne(news)
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

const updateNews = (req, res, next) => {
  const {
    createdAt, title, slug, tags, preview, article, image,
  } = req.body;
  News.findByIdAndUpdate(
    req.params._id,
    {
      createdAt,
      title,
      slug,
      tags,
      preview,
      article,
      image,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound(NOT_FOUND_TEXT);
    })
    .then((news) => res.status(200).send(news))
    .catch((err) => {
      if (Object.keys(err.keyValue).toString() === 'slug') {
        next(new ConflictError(CONFLICT_ERROR_SLUG));
      } else if (Object.keys(err.keyValue).toString() === 'image.path') {
        next(new ConflictError(CONFLICT_ERROR_IMAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST_TEXT));
      } else {
        next(err);
      }
    });
};

const getAllNews = (req, res, next) => {
  News.find({})
    .then((news) => res.status(200).send(news))
    .catch(next);
};

module.exports = {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
};
