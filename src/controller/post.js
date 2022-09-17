const postModel = require('../model/post');
const userModel = require('../model/usuario');
const { manyPostFormatter, postFormatter, postOnlyFormatter } = require('../view/post');


getPosts = async (req, res) => {
    try{
        let posts = await postModel.find();
        res.status(200).json(manyPostFormatter(posts));
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get posts"});
    }
};

getPostsById = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id) throw new Error();

        const post = (await postModel.find({ _id: { $eq: id } }));

        if(post.length === 0){
            throw new Error(`Não foi possível achar postagem`);
        }
        res.status(200).json(postOnlyFormatter(post[0]));
    }catch(e) {
        res.status(400).json({message: e.message || `Could not get post ${id}`})
    }
};

// TODO - /api/posts/:id/comentarios

const createPost = async (req, res) => {
    try{
        const {
            id_usuario, texto, likes
        } = req.body;

        const user = await userModel.find({_id : { $eq: [id_usuario]}});

        if(user.length === 0) throw new Error('Usuario não encontrado.');

        const post = await postModel.create({id_usuario, texto, likes});
        res.status(200).json(postOnlyFormatter(post));
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

const deletePost = async (req, res) => {
    try{
        const {id} = req.params;

        if(!id) {
            throw new Error('Invalid post id sent');
        }

        const response = await postModel.deletePost({id});
        res.status(200).json(response);
    }catch(e){
        res.status(400).json({message: e.message || "Could not delete post"});
    }
}

module.exports = {
    getPosts,
    getPostsById,
    createPost,
    deletePost
}