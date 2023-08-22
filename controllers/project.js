const Project = require('../models/project');
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

const createProject = async (req, res, next) => {
  const {
    title, slug, tags, preview, article, image,
  } = req.body;
  await Project.create({
    title,
    slug,
    tags,
    preview,
    article,
    image,
    owner: req.user._id,
  })
    .then((project) => {
      res.status(201).send(project);
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

const deleteProject = (req, res, next) => {
  Project.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(NOT_FOUND_TEXT);
    })
    .then((project) => {
      if (project.owner.toString() === req.user._id) {
        Project.deleteOne(project)
          .then(() => res.status(200).send(project))
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

const updateProject = (req, res, next) => {
  const {
    title, slug, tags, preview, article, image,
  } = req.body;
  Project.findByIdAndUpdate(
    req.params._id,
    {
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
    .then((project) => res.status(200).send(project))
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

const getAllProject = (req, res, next) => {
  Project.find({})
    .then((project) => res.status(200).send(project))
    .catch(next);
};

module.exports = {
  createProject,
  deleteProject,
  getAllProject,
  updateProject,
};
