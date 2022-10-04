const express = require('express');
const postController = require('../controller/post');
const postRouter = express.Router();
const {auth} = require("../controller/auth")

postRouter.get('/', auth, postController.getPosts);
postRouter.get('/:id', auth, postController.getPostsById);
postRouter.get('/:id/comentarios', auth, postController.getPostComentariosById);

postRouter.post('/', auth, postController.createPost);

postRouter.delete('/:id', auth, postController.deletePost);


module.exports = {
    postRouter
}