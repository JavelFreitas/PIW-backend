const e = require('express');
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try{
      const { token } = req.headers;

      if(!token) throw new Error('Token inválido');

      const response = await jwt.verify(token, process.env.JWT_SECRET_KEY);

      next();
    }catch(error){
      res.status(400).json({message: error.message || "Erro ao autenticar"});
    }
  }

module.exports = {
    auth
}