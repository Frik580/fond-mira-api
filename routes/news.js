const router = require("express").Router();
const auth = require('../middlewares/auth');
const {
  createNews,
  deleteNews,
  updateNews,
  getAllNews,
} = require("../controllers/news");
const {
  validateDeleteNews,
  validateCreateNews,
  validateUpdateNews,
} = require("../middlewares/validation");

router.get("/news", getAllNews);

router.use(auth);

router.delete("/news/:_id", validateDeleteNews, deleteNews);

router.post("/news", validateCreateNews, createNews);

router.patch("/news/:_id", validateUpdateNews, updateNews);

module.exports = router;
