const express = require('express');
const usuarioController = require('../controller/usuario');
const usuarioRouter = express.Router();

usuarioRouter.get('/', usuarioController.getUsuarios);

usuarioRouter.get('/:id', usuarioController.getUsuarioById);

usuarioRouter.post('/', usuarioController.postUsuario);

usuarioRouter.delete('/:id', usuarioController.deleteUsuario);


module.exports = {
    usuarioRouter
}