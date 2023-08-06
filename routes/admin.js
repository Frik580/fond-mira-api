const router = require("express").Router();
const auth = require('../middlewares/auth');
const {
  createAdmin,
  login,
  deleteAdmin,
  getAllAdmins,
} = require("../controllers/admin");
const {
  validateCreateAdmin,
  validateLogin,
  validateDeleteAdmin,
} = require("../middlewares/validation");

router.post('/signup', validateCreateAdmin, createAdmin);

router.post('/signin', validateLogin, login);

router.use(auth);

router.get('/admin', getAllAdmins);

router.delete('/admin/:_id', validateDeleteAdmin, deleteAdmin);

module.exports = router;