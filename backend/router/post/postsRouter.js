// backend/routes/posts/postRoutes.js
const express = require('express');
const postController = require('../../controllers/posts/postController');
const authenticateUser = require('../../middlewares/authenticateUser');

// CREATE INSTANCE OF EXPRESS ROUTER
const postRouter = express.Router();

// CREATE POST - Protected
postRouter.post('/create', authenticateUser, postController.createPost);

// READ ALL POSTS - Public
postRouter.get('/', postController.fetchAllPosts);

// GET SINGLE POST - Public
postRouter.get('/:postId', postController.getPost);

// UPDATE POST - Protected
postRouter.put('/:postId', authenticateUser, postController.updatePost);

// DELETE POST - Protected
postRouter.delete('/:postId', authenticateUser, postController.deletePost);

module.exports = postRouter;
