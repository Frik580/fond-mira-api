const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createTopNews,
  deleteTopNews,
  getAllTopNews,
} = require('../controllers/topNews');
const {
  validateDelete,
  validateCreateTopNews,
} = require('../middlewares/validation');

router.get('/top-news', getAllTopNews);

router.delete('/top-news/:_id', auth, validateDelete, deleteTopNews);

router.post('/top-news', auth, validateCreateTopNews, createTopNews);

module.exports = router;
