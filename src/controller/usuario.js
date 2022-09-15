const usuarioModel = require("../model/usuario");

getUsuarios = async (req, res) => {
  try {
    res.status(200).json(await usuarioModel.find());
  } catch (e) {
    res.status(400).json({ message: "Algo deu errado ao buscar por usuários" });
  }
};

getUsuarioById = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    if (!usuarioId) throw new Error();

    const usuario = (await usuarioModel.find({_id : {$in : [usuarioId]}}));

    if (!usuario) {
      throw new Error(`Could not find user ${usuarioId}`);
    }
    res.status(200).json(usuario[0]);
  } catch (e) {
    res.status(400).json({ message: "Something went wrong while trying to get student" });
  }
}

const postUsuario = async (req, res) => {
  try {
    const {
      id, name, email, senha
    } = req.body;
    const usuario = await usuarioModel.create({ id, nome: name, email, senha });
    res.status(200).json(usuario);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

const deleteUsuario = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    if(!id) throw new Error('ID inválido fornecido');
    const response = await usuarioModel.deleteOne({ _id: id });

    if(!response.deletedCount) throw new Error(`Não foi possível deletar o usuário`);
    res.status(200).json({message: `Usuario deletado com sucesso`});
  } catch (e) {
    res.status(400).json({ message: e.message || 'Não foi possível deletar o usuário' });
  }
}

//TODO[epic=User endpoint] get user by post id - after finish Posts

module.exports = {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  deleteUsuario,
}