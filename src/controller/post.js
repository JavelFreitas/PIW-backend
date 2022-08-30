const postModel = require('../model/post');


getPosts = async (req, res) => {
    try {
        res.status(200).json(await postModel.getPosts());
    } catch (e) {
        res.status(400).json({ message: "Something went wrong while trying to get posts" });
    }
};

getPostsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error();

        const post = await postModel.getPostById(parseInt(id))

        if (!post) {
            throw new Error(`Could not find post ${id}`);
        }
        res.status(200).json(post)
    } catch (e) {
        res.status(400).json({ message: e.message || `Could not get post ${id}` })
    }
}

const createPost = async (req, res) => {
    try {
        const {
            id = null, texto = null, likes = null
        } = req.body;
        if (!id || !texto || !likes) throw new Error('Dado não fornecido');


        const post = await postModel.createPost({ id, texto, likes });

        res.status(200).json({ ...post });
    } catch (e) {
        res.status(400).json({ message: e.message || 'Erro ao criar um post' });
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error('Invalid post id sent');
        }

        const response = await postModel.deletePost({ id });
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ message: e.message || "Could not delete post" });
    }
}

module.exports = {
    getPosts,
    getPostsById,
    createPost,
    deletePost
}