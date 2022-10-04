const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try{
      const { token } = req.headers
      const response = await jwt.verify(token, process.env.JWT_SECRET_KEY);

      next();
    }catch(error){
      res.status(400).json({message: error.message || "Erro ao autenticar"});
    }
  }

module.exports = {
    auth
}