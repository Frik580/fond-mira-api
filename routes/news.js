const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createNews,
  deleteNews,
  updateNews,
  getAllNews,
} = require('../controllers/news');
const {
  validateDeleteNews,
  validateCreateNews,
  validateUpdateNews,
} = require('../middlewares/validation');

router.get('/news', getAllNews);

router.delete('/news/:_id', auth, validateDeleteNews, deleteNews);

router.post('/news', auth, validateCreateNews, createNews);

router.patch('/news/:_id', auth, validateUpdateNews, updateNews);

module.exports = router;
