const express = require('express');
const usersRouter = express.Router();

const mockUsers = [
    {
        id: 1,
        name: "Leticia",
        email: "leticiaf@gmail.com"
    }
]

usersRouter.get('/', (req, res) => {
    try{
        res.status(200).json(mockUsers)
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get users"});
    }
})

module.exports = {
    usersRouter
}