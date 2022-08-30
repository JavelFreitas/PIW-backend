const usuarioModel = require("../model/usuario");

getUsuarios = async (req, res) => {
    try {
        res.status(200).json(await usuarioModel.getUsuarios());
    } catch (e) {
        res.status(400).json({ message: "Something went wrong while trying to get student" });
    }
};

getUsuarioById = async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id);
        if (!usuarioId) throw new Error();

        const usuario = await usuarioModel.getUsuarioById(usuarioId)

        if (!usuario) {
            throw { status: 404, message: `Usuário ${usuarioId} não existe` };
        }
        res.status(200).json(usuario);
    } catch (e) {
        res.status(e.status || 400).json({ message: "Something went wrong while trying to get student" });
    }
}

const postUsuario = async (req, res) => {
    try {
        const {
            id = null, nome = null, email = null, senha = null
        } = req.body;
        if (!id || !nome || !email || !senha) {
            throw new Error('Dado não fornecido');
        }
        const usuario = await usuarioModel.postUsuario({ id, nome, email, senha });
        res.status(200).json({ ...usuario });
    } catch (e) {
        res.status(400).json({ message: e.message || 'Something went wrong while trying to insert student' });
    }
}

const deleteUsuario = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        res.status(200).json(await usuarioModel.deleteUsuario({ id }));
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    postUsuario,
    deleteUsuario
}