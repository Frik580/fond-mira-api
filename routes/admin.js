const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createAdmin,
  login,
  deleteAdmin,
  getAllAdmins,
} = require('../controllers/admin');
const {
  validateCreateAdmin,
  validateLogin,
  validateDelete,
} = require('../middlewares/validation');

router.post('/signup', validateCreateAdmin, createAdmin);

router.post('/signin', validateLogin, login);

router.get('/admin', auth, getAllAdmins);

router.delete('/admin/:_id', auth, validateDelete, deleteAdmin);

module.exports = router;
