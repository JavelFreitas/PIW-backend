const express = require('express');
const comentarioController = require('../controller/comentario');
const comentarioRouter = express.Router();
const {auth} = require("../controller/auth")

comentarioRouter.post('/', auth, comentarioController.createComentario);

comentarioRouter.get('/', auth, comentarioController.getComentario);

comentarioRouter.delete('/:id', auth, comentarioController.deleteComentarioById);


module.exports = {
    comentarioRouter
}