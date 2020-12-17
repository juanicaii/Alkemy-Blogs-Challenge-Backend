const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const validation = require('../utils/schmeValidator');
const asyncMiddleware = require('../utils/asyncMiddleware');
const { checkSchema } = require('express-validator');

router.get('/posts', asyncMiddleware(postsController.getPosts));
router.get(
  '/posts/:id',
  checkSchema(validation.schemeValidationId),
  asyncMiddleware(postsController.getPost)
);
router.post(
  '/posts',
  checkSchema(validation.schemeValidationPost),
  asyncMiddleware(postsController.createPost)
);
router.patch(
  '/posts/:id',
  checkSchema({ ...validation.schemeValidationPost, ...validation.schemeValidationId }),
  asyncMiddleware(postsController.editPost)
);
router.delete(
  '/posts/:id',
  checkSchema(validation.schemeValidationId),
  asyncMiddleware(postsController.deletePost)
);

module.exports = router;
