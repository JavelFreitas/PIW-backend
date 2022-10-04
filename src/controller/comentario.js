const comentarioModel = require('../model/comentario')
const userModel = require('../model/usuario')
const postModel = require('../model/post');
const { comentarioFormatter, manyComentarioFormatter } = require('../view/comentario');
const jwt = require('jsonwebtoken');

const createComentario = async (req, res) => {
    try{
        const {
            id_post, texto
        } = req.body;
        const {token} = req.headers;
        const userToken = jwt.decode(token);
        if(!userToken || !userToken.id) throw new Error('Token inválido');

        const id_usuario = userToken.id;

        if(!texto) throw new Error('Texto inválido');

        const user = await userModel.find({_id : { $eq: [id_usuario]}});
        if(user.length === 0) throw new Error('Usuario não encontrado.');

        const post = await postModel.find({_id : { $eq: [id_post]}});
        if(post.length === 0) throw new Error('Postagem não encontrado.');
        
        const response = await comentarioModel.create({id_usuario, id_post, texto});
        if(response.length === 0) throw new Error('Comentario não criado.');

        res.status(200).json("Comentário criado com sucesso");
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

const getComentario = async (req, res) => {
    try{
        const response = await comentarioModel.find();
        res.status(200).json(manyComentarioFormatter(response));
    }catch(e) {
        res.status(400).json({message: e.message || 'Não foi possível buscar os comentários'})
    }
}

const deleteComentarioById = async (req, res) => {
    try{
        const {id} = req.params;
        const {token} = req.headers;
        const userToken = jwt.decode(token);

        if(!userToken || !userToken.id) throw new Error('Token inválido');
        if (!id) throw new Error('ID inválido fornecido');

        const id_usuario = userToken.id;
        const comment = await comentarioModel.findById(id);
        if(!comment) throw new Error('Comentário não encontrado');

        if(id_usuario != comment.id_usuario) throw new Error("Comentario não pertence a este usuário");

        const response = await comentarioModel.deleteOne({ _id: id });

        if (response.deletedCount === 0) throw new Error(`Não foi possível deletar o comentario`);
        res.status(200).json({ message: `Comentario deletado com sucesso` });
    } catch (e) {
        res.status(400).json({ message: e.message || 'Não foi possível deletar o comentario' });
    }
}

module.exports = {
    createComentario,
    getComentario,
    deleteComentarioById,
}