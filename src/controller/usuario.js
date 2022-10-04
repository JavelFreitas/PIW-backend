const usuarioModel = require("../model/usuario");
const postModel = require("../model/post");
const { manyUsuarioFormatter, usuarioFormatter, usuarioCreateFormatter } = require("../view/usuario");
const { manyPostFormatter } = require("../view/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


getUsuarios = async (req, res) => {
  try {
    let response = await usuarioModel.find()
    res.status(200).json(manyUsuarioFormatter(response));
  } catch (e) {
    res.status(400).json({ message: "Algo deu errado ao buscar por usuários" });
  }
};

getUsuarioById = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    if (!usuarioId) throw new Error();

    const usuario = (await usuarioModel.find({ _id: { $in: [usuarioId] } }));

    if (usuario.length === 0) {
      throw new Error(`Não foi possível encontrar usuário`);
    }
    res.status(200).json(usuarioFormatter(usuario[0]));
  } catch (e) {
    res.status(400).json({ message: e.message || "Algo deu errado ao buscar por usuários" });
  }
}

getUsuarioPostsById = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    if (!usuarioId) throw new Error();

    const posts = (await postModel.find({ id_usuario: { $eq: usuarioId } }));

    if (posts.length === 0) {
      throw new Error(`Não foi possível encontrar posts`);
    }
    res.status(200).json(manyPostFormatter(posts));
  } catch (e) {
    res.status(400).json({ message: e.message || "Algo deu errado ao buscar por posts" });
  }
}

const postUsuario = async (req, res) => {
  try {
    const {
      nome, email, senha
    } = req.body;

    const duplicate = await usuarioModel.findOne({
      email: {
        '$eq': email,
      }
    })

    if (!!duplicate) {
      throw new Error('Email já cadastrado')
    }

    const hashPassword = bcrypt.hashSync(senha, parseInt(process.env.BCRYPT_SALT, 10));

    const usuario = await usuarioModel.create({ nome, email, senha: hashPassword });
    res.status(200).json(usuarioCreateFormatter(usuario));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.headers

    if (!id) throw new Error('ID inválido fornecido');

    const userToken = jwt.decode(token);

    if(userToken.id !== id) throw new Error('Token inválido para este usuário');

    const response = await usuarioModel.deleteOne({ _id: id });

    if (!response.deletedCount) throw new Error(`Não foi possível deletar o usuário`);
    res.status(200).json({ message: `Usuario deletado com sucesso` });
  } catch (e) {
    res.status(400).json({ message: e.message || 'Não foi possível deletar o usuário' });
  }
}


const login = async (req, res) => {
  try {

    let { email, senha } = req.body;

    let findUserByEmail = await usuarioModel.findOne({ email });

    if (!findUserByEmail) throw new Error("Usuário não encontrado")

    let validate = await bcrypt.compareSync(senha, findUserByEmail.senha);

    if(!validate) throw new Error("Senha incorreta");

    const response = jwt.sign({
      id: findUserByEmail._id,
    }, process.env.JWT_SECRET_KEY)

    res.status(201).json({ token: response });

  } catch (error) {
    res.status(400).json({ message: error.message || "Erro ao tentar logar" });
  }
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  deleteUsuario,
  getUsuarioPostsById,
  login,
}