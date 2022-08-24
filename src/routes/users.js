const express = require('express');
const usersController = require('../controller/users');
const usersRouter = express.Router();

const mockUsers = [
    {
        id: 1,
        name: "Leticia Farias",
        email: "leticiaf@gmail.com",
        senha: "123"
    },
    {
        id: 2,
        name: "Javel Queiroz",
        email: "javel@gmail.com",
        senha: "123"
    },
    {
        id: 3,
        name: "Victor Farias",
        email: "victorF@gmail.com",
        senha: "123"
    },
]

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/:id', usersController.getUserById);


module.exports = {
    usersRouter
}