const postFormatter = function(post) {
    return {
        id: post._id,
        texto: post.texto,
        likes: post.likes,
        id_usuario: post.id_usuario,
    }
}

const postOnlyFormatter = function(post) {
    return {
        id: post._id,
        texto: post.texto,
        likes: post.likes,
    }
}

const manyPostFormatter = function(posts) {
    const formattedPosts = posts.map(post => {
        return postFormatter(post);
    })
    return formattedPosts
}


module.exports = {
    postFormatter,
    manyPostFormatter,
    postOnlyFormatter,
};