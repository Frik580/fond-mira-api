const News = require('../models/news');
const { BadRequest } = require('../errors/badrequest');
const { Forbidden } = require('../errors/forbidden');
const { NotFound } = require('../errors/notfound');
const {
  BAD_REQUEST,
  NOT_FOUND_CARD,
  BAD_REQUEST_CARD,
} = require('../utils/errors-message');

const createNews = (req, res, next) => {
  const {
    createdAt,
    title,
    slug,
    tags,
    preview,
    article,
    image,
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
      if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteNews = (req, res, next) => {
  News.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(NOT_FOUND_CARD);
    })
    .then((news) => {
      console.log(news.owner.toString());
      console.log(req.user._id);
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
        next(new BadRequest(BAD_REQUEST_CARD));
      } else {
        next(err);
      }
    });
};

const updateNews = (req, res, next) => {
  const {
    createdAt,
    title,
    slug,
    tags,
    preview,
    article,
    image,
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
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound(NOT_FOUND_CARD);
    })
    .then((news) => res.status(200).send(news))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST_CARD));
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
