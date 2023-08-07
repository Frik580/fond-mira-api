const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createProject,
  deleteProject,
  updateProject,
  getAllProject,
} = require('../controllers/project');
const {
  validateDelete,
  validateCreateProject,
  validateUpdateProject,
} = require('../middlewares/validation');

router.get('/project', getAllProject);

router.delete('/project/:_id', auth, validateDelete, deleteProject);

router.post('/project', auth, validateCreateProject, createProject);

router.patch('/project/:_id', auth, validateUpdateProject, updateProject);

module.exports = router;
