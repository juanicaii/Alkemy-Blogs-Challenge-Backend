const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const schmeValidationPost = require('../utils/schmeValidator');
const asyncMiddleware = require('../utils/boomError');

router.get('/posts', asyncMiddleware(postsController.getPosts));
router.get('/posts/:id', postsController.getPost);
router.post('/posts', schmeValidationPost, asyncMiddleware(postsController.createPost));
router.patch('/posts/:id', schmeValidationPost, postsController.editPost);
router.delete('/posts/:id', postsController.deletePost);

module.exports = router;
