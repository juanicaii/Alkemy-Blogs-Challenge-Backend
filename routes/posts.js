const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
/* GET home page. */
router.get('/posts', postsController.getPosts);
router.get('/posts/:id', postsController.getPost);
router.post('/posts', postsController.createPost);
router.patch('/posts/:id', postsController.editPost);
router.delete('/posts/:id', postsController.deletePost);

module.exports = router;
