const express = require('express');
const comentarioController = require('../controller/comentario');
const comentarioRouter = express.Router();

comentarioRouter.post('/', comentarioController.createComentario);
comentarioRouter.get('/', comentarioController.getComentario);


module.exports = {
    comentarioRouter
}