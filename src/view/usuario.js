const usuarioFormatter = function(usuario) {
    return {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
    }
}

const manyUsuarioFormatter = function(usuarios) {
    const formattedUsers = usuarios.map(usuario => {
        return usuarioFormatter(usuario)
    })
    return formattedUsers
}


module.exports = {
    usuarioFormatter,
    manyUsuarioFormatter,
};