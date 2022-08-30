const postModel = require('../model/post');


getPosts = async (req, res) => {
    try {
        res.status(200).json(await postModel.getPosts());
    } catch (e) {
        res.status(400).json({ message: "Não foi possível buscar posts" });
    }
};

getPostsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) throw new Error();

        const post = await postModel.getPostById(parseInt(id))

        if (!post) {
            throw { status: 404, message: `Post ${id} não existe` };
        }
        res.status(200).json(post)
    } catch (e) {
        res.status(e.status || 400).json({ message: e.message || `Algo deu errado ao buscar post` })
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
            throw new Error('ID inválido recebido');
        }

        const response = await postModel.deletePost({ id });
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ message: e.message || "Não foi possível deletar post" });
    }
}

module.exports = {
    getPosts,
    getPostsById,
    createPost,
    deletePost
}