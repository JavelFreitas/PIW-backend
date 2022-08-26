const postModel = require('../model/post');


getPosts = async (req, res) => {
    try{
        res.status(200).json(await postModel.getPosts());
    }catch(e){
        res.status(400).json({message: "Something went wrong while trying to get posts"});
    }
};

getPostsById = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id) throw new Error();

        const post = await postModel.getPostById(parseInt(id))

        if(!post){
            throw new Error(`Could not find post ${id}`);
        }
        res.status(200).json(post)
    }catch(e) {
        res.status(400).json({message: e.message || `Could not get post ${id}`})
    }
}

const createPost = async (req, res) => {
    try{
        const {
            id, texto, likes
        } = req.body;
        const post = await postModel.createPost({id, texto, likes});
        res.status(200).json({...post});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

module.exports = {
    getPosts,
    getPostsById,
    createPost
}