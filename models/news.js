const mongoose = require('mongoose');
const { datePattern } = require('../utils/constants');

const { Schema, model } = mongoose;

// const mediaSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   path: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });

const newsSchema = new Schema({
  createdAt: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return datePattern.test(v);
      },
      message: 'Передан некорректный формат даты',
    },
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  tags: [String],
  preview: {
    type: String,
    required: true,
    maxlength: 200,
  },
  article: [
    {
      type: String,
      required: true,
    },
  ],
  photo: {
    type: Number,
    required: true,
  },
  video: [String],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
  },
});

module.exports = model('news', newsSchema);
