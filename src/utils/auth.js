const jwt = require('jsonwebtoken')

const compareIdWithToken = (userId, token) => {
    try {
      const userToken = jwt.decode(token);
      if(!userToken.id) throw new Error("Token não possui id");
  
      if(userId !== userToken.id) return false;
      
      return true;
    } catch (error) {
      throw new Error(error.message || "Token não pertence a este usuario")
    }
}

module.exports = {
    compareIdWithToken
}