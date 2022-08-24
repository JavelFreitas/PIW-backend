const usuarioModel = require("../model/usuario");


getUsuarios = async (req, res) => {
    try{
        res.status(200).json({usuarios: await usuarioModel.getUsuarios()});
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get student"});
    }
};

getUsuarioById = async (req, res) => {
    try{
        const usuarioId = parseInt(req.params.id);
        if(!usuarioId) throw new Error();

        const usuario = await usuarioModel.getUsuarioById(usuarioId)
        res.status(200).json(usuario)
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get stundent"});
    }
}

const postUsuario = async (req, res) => {
    try{
        const {
           id, name, email, senha
        } = req.body;
        const usuario = await usuarioModel.postUsuario({id, name, email, senha});
        res.status(200).json({...usuario});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

const deleteUsuario = async (req, res) => {
    try{
        const {
           id
        } = req.params;
        const response = await usuarioModel.deleteUsuario({id});
        res.status(200).json({response});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    postUsuario,
    deleteUsuario
}