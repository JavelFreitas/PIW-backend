const express = require('express');
const usuarioController = require('../controller/usuario');
const usuarioRouter = express.Router();
const {auth} = require("../controller/auth")

usuarioRouter.post('/', usuarioController.postUsuario);

usuarioRouter.post('/login', usuarioController.login);

usuarioRouter.get('/', auth, usuarioController.getUsuarios);

usuarioRouter.get('/:id', auth, usuarioController.getUsuarioById);

usuarioRouter.get('/:id/posts', auth, usuarioController.getUsuarioPostsById);

usuarioRouter.delete('/:id', auth, usuarioController.deleteUsuario);

module.exports = {
    usuarioRouter
}