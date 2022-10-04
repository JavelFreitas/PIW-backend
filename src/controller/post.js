const postModel = require('../model/post');
const userModel = require('../model/usuario');
const comentarioModel = require('../model/comentario');
const { manyPostFormatter, postFormatter, postOnlyFormatter } = require('../view/post');
const { manyComentarioFormatter } = require('../view/comentario');
const { compareIdWithToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');
getPosts = async (req, res) => {
  try {
    let posts = await postModel.find();
    res.status(200).json(manyPostFormatter(posts));
  } catch (e) {
    res.status(400).json({ message: "Something went wrong while trying to get posts" });
  }
};

getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error();

    const post = (await postModel.find({ _id: { $eq: id } }));

    if (post.length === 0) {
      throw new Error(`Não foi possível achar postagem`);
    }
    res.status(200).json(postOnlyFormatter(post[0]));
  } catch (e) {
    res.status(400).json({ message: e.message || `Não foi possível achar postagem` })
  }
};

getPostComentariosById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error();

    const comentarios = (await comentarioModel.find({ id_post: { $eq: id } }));

    if (comentarios.length === 0) {
      throw new Error(`Não foi possível achar comentários`);
    }
    res.status(200).json(manyComentarioFormatter(comentarios));
  } catch (e) {
    res.status(400).json({ message: e.message || `Não foi possível achar comentários` })
  }
};

const createPost = async (req, res) => {
  try {
    const {
      texto, likes
    } = req.body;

    const { token } = req.headers;
    const userToken = jwt.decode(token)
    if(!userToken || !userToken.id) throw new Error("Token inválido");

    const id_usuario = userToken.id;
    const user = await userModel.find({ _id: { $eq: [id_usuario] } });

    if (user.length === 0) throw new Error('Usuario não encontrado.');

    const post = await postModel.create({ id_usuario, texto, likes });
    res.status(200).json(postOnlyFormatter(post));
  } catch (e) {
    res.status(400).json({ message: e.message || 'Erro ao criar post' });
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {token} = req.headers;

    const userToken = jwt.decode(token);
    const post = await postModel.findOne({_id: id});
    if(!userToken || !userToken.id) throw new Error("Token inválido");

    if(userToken.id != post.id_usuario) throw new Error("Post não pertence a este usuário");

    const response = await postModel.deleteOne({ _id: { $eq: id } });

    if (response.deletedCount < 1) throw new Error('Post não encontrado')
    res.status(200).json({ message: 'Post deletado com sucesso' });
  } catch (e) {
    res.status(400).json({ message: e.message || "Não foi possícel deletar post" });
  }
}

module.exports = {
  getPosts,
  getPostsById,
  createPost,
  deletePost,
  getPostComentariosById,
}