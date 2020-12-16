const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const validation = require('../utils/schmeValidator');
const asyncMiddleware = require('../utils/boomError');

router.get('/posts', asyncMiddleware(postsController.getPosts));
router.get('/posts/:id', validation.schemeValidationId, asyncMiddleware(postsController.getPost));
router.post('/posts', validation.schemeValidationPost, asyncMiddleware(postsController.createPost));
router.patch(
  '/posts/:id',
  validation.schemeValidationPost,
  asyncMiddleware(postsController.editPost)
);
router.delete(
  '/posts/:id',
  validation.schemeValidationId,
  asyncMiddleware(postsController.deletePost)
);

module.exports = router;
