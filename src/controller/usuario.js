const usuarioModel = require("../model/usuario");

getUsuarios = async (req, res) => {
    try{
        res.status(200).json(await usuarioModel.getUsuarios());
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get student"});
    }
};

getUsuarioById = async (req, res) => {
    try{
        const usuarioId = parseInt(req.params.id);
        if(!usuarioId) throw new Error();

        const usuario = await usuarioModel.getUsuarioById(usuarioId)

        if(!usuario){
            throw new Error(`Could not find user ${usuarioId}`);
        }
        res.status(200).json(usuario)
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get student"});
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
        res.status(200).json(await usuarioModel.deleteUsuario({id}));
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