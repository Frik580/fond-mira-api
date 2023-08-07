const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const { passwordPattern, datePattern } = require('../utils/constants');

// const validateDeleteUser = celebrate({
//   params: Joi.object().keys({
//     _id: Joi.string().required().hex().length(24),
//   }),
// });

const validateDeleteAdmin = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

// const validateCreateUser = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     email: Joi.string().required().email(),
//   }),
// });

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

const validateDeleteNews = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

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

module.exports = {
  // validateCreateUser,
  validateLogin,
  validateUpdateNews,
  validateDeleteNews,
  validateCreateNews,
  // validateDeleteUser,
  validateCreateAdmin,
  validateDeleteAdmin,
};
