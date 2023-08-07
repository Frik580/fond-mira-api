const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const imageSchema = new mongoose.Schema({
  name: String,
  description: String,
  path: {
    type: String,
    required: true,
    unique: true,
  },
});

const projectSchema = new Schema({
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
  image: [imageSchema],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
  },
});

module.exports = model('project', projectSchema);
