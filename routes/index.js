const router = require('express').Router();
const { NOT_FOUND } = require('../utils/errors-message');
const { NotFound } = require('../errors/notfound');

const adminRouter = require('./admin');
const topNewsRouter = require('./topNews');
const newsRouter = require('./news');
const projectRouter = require('./project');

router.use('/', adminRouter);
router.use('/', topNewsRouter);
router.use('/', newsRouter);
router.use('/', projectRouter);

router.use('*', () => {
  throw new NotFound(NOT_FOUND);
});

module.exports = router;
