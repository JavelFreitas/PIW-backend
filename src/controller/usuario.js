const usuarioModel = require("../model/usuario");


getUsuarios = (req, res) => {
    try{
        res.status(200).json({usuarios: usuarioModel.getUsuarios()});
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get student"});
    }
};

getUsuarioById = (req, res) => {
    try{
        const UsuarioId = parseInt(req.params.id);
        if(!UsuarioId) throw new Error();

        const Usuario = usuarioModel.getUsuarioById(UsuarioId)
        res.status(200).json(Usuario)
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get stundent"});
    }
}

const postUsuario = async (req, res) => {
    try{
        const {
           id, name, email, senha
        } = req.body;
        const usuario = usuarioModel.postUsuario({id, name, email, senha});
        res.status(200).json({usuario});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    postUsuario
}