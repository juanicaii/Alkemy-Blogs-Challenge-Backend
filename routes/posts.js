const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const schemeValidationId = require('../validators/schemeValidationId');
const schemeValidationPost = require('../validators/schemeValdiationPost');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const { checkSchema } = require('express-validator');

router.get('/posts', asyncMiddleware(postsController.getPosts));
router.get('/posts/:id', checkSchema(schemeValidationId), asyncMiddleware(postsController.getPost));
router.post(
  '/posts',
  checkSchema(schemeValidationPost),
  asyncMiddleware(postsController.createPost)
);
router.patch(
  '/posts/:id',
  checkSchema({ ...schemeValidationPost, ...schemeValidationId }),
  asyncMiddleware(postsController.editPost)
);
router.delete(
  '/posts/:id',
  checkSchema(schemeValidationId),
  asyncMiddleware(postsController.deletePost)
);

module.exports = router;
