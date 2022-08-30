let mockPosts = [
    {
        id: 1,
        texto: "Oi, tudo bem?",
        likes: 6
    },
    {
        id: 5,
        texto: "Tudo bom! E vc?",
        likes: 6
    }
]

const getPosts = async () => {

    return await mockPosts.sort((a, b) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1;
        return 0;
    });
}

const getPostById = async (id) => {
    return mockPosts.find(post => post.id === id);
}

const createPost = async (post) => {
    try {
        const idExists = mockPosts.find(mock => mock.id === post.id);
        if (idExists) throw new Error(`Post ${post.id} já existe`);
        mockPosts.push(post);
        return post;
    } catch (e) {
        return {
            message: e.message || "Não foi possível inserir post"
        }
    }
}

const deletePost = async (post) => {
    try {
        const idExists = mockPosts.find(mock => mock.id === parseInt(post.id));
        if (!idExists) throw new Error(`Post ${post.id} não foi encontrado`);

        mockPosts = mockPosts.filter(mockPost => !(mockPost.id === parseInt(post.id)));

        return { message: "Post removido com sucesso" };
    } catch (e) {
        return {
            message: e.message || "Não foi possível deletar post"
        }
    }
}


module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost
}