const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const { passwordPattern, datePattern } = require('../utils/constants');

const validateDelete = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

// admin
const validateCreateAdmin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp(passwordPattern)),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp(passwordPattern)),
  }),
});

// news
const validateCreateNews = celebrate({
  body: Joi.object().keys({
    createdAt: Joi.string().required().pattern(new RegExp(datePattern)),
    title: Joi.string().required(),
    slug: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    preview: Joi.string().required().max(200),
    article: Joi.array().items(Joi.string().required()),
    image: Joi.array().items({
      name: Joi.string(),
      description: Joi.string(),
      path: Joi.string().required(),
    }),
  }),
});

const validateUpdateNews = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
  body: Joi.object().keys({
    createdAt: Joi.string().required().pattern(new RegExp(datePattern)),
    title: Joi.string().required(),
    slug: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    preview: Joi.string().required().max(200),
    article: Joi.array().items(Joi.string().required()),
    image: Joi.array().items({
      name: Joi.string(),
      description: Joi.string(),
      path: Joi.string().required(), // ?
    }),
  }),
});

// topNews
const validateCreateTopNews = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    preview: Joi.string().required().max(200),
    image: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      path: Joi.string().required(),
    }),
  }),
});

// project
const validateCreateProject = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    preview: Joi.string().required().max(200),
    article: Joi.array().items(Joi.string().required()),
    image: Joi.array().items({
      name: Joi.string(),
      description: Joi.string(),
      path: Joi.string().required(),
    }),
  }),
});

const validateUpdateProject = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    preview: Joi.string().required().max(200),
    article: Joi.array().items(Joi.string().required()),
    image: Joi.array().items({
      name: Joi.string(),
      description: Joi.string(),
      path: Joi.string().required(), // ?
    }),
  }),
});

module.exports = {
  validateDelete,
  validateCreateAdmin,
  validateLogin,
  validateCreateNews,
  validateUpdateNews,
  validateCreateProject,
  validateUpdateProject,
  validateCreateTopNews,
};
