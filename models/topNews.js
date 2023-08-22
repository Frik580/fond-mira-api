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

const topNewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
    maxlength: 200,
  },
  image: imageSchema,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
  },
});

module.exports = model('topNews', topNewsSchema);
