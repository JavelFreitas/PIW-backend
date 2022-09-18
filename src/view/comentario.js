const comentarioFormatter = function(comentario) {
    return {
        id: comentario._id,
        texto: comentario.texto,
        id_post: comentario.id_post,
        id_usuario: comentario.id_usuario,
    }
}

const manyComentarioFormatter = function(comentarios) {
    const formattedComentario = comentarios.map(comentario => {
        return comentarioFormatter(comentario);
    })
    return formattedComentario
}


module.exports = {
    comentarioFormatter,
    manyComentarioFormatter,
};