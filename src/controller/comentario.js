const comentarioModel = require('../model/comentario')
const userModel = require('../model/usuario')
const postModel = require('../model/post');
const { comentarioFormatter, manyComentarioFormatter } = require('../view/comentario');

const createComentario = async (req, res) => {
    try{
        const {
            id_usuario, id_post, texto
        } = req.body;

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

module.exports = {
    createComentario,
    getComentario
}