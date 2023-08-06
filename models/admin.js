const mongoose = require('mongoose');
const validator = require('validator');
const { passwordPattern } = require('../utils/constants');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Передан некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        return passwordPattern.test(v);
      },
      message: 'Передана некорректный пароль',
    },
  },
});

module.exports = mongoose.model('admin', adminSchema);
