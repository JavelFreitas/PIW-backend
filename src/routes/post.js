const express = require('express');
const postController = require('../controller/post');
const postRouter = express.Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:id', postController.getPostsById);

postRouter.post('/', postController.createPost);

postRouter.delete('/:id', postController.deletePost);


module.exports = {
    postRouter
}