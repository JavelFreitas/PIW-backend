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
    return mockPosts
}

const getPostById = async (id) => {
    return mockPosts.find(post => post.id === id);
}

const createPost = async (post) => {
    try{
        const idExists = mockPosts.find(mock => mock.id === post.id);
        if(idExists) throw new Error(`Post ${post.id} já existe`);
        mockPosts.push(post);
        return post;
    }catch(e) {
        return {
            message: e.message || "Could not insert post"
        }
    }
}

const deletePost = async (post) => {
    try{
        const idExists = mockPosts.find(mock => mock.id === parseInt(post.id));
        if(!idExists) throw new Error(`Post ${post.id} não existe`);
        
        mockPosts = mockPosts.filter(mockPost => !(mockPost.id === parseInt(post.id)));

        return {message: "Post removido com sucesso"};
    }catch(e) {
        return {
            message: e.message || "Could not delete post"
        }
    }
}


module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost
}