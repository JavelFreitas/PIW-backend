const usuarioFormatter = function(usuario) {
    return {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
    }
}

const usuarioCreateFormatter = (usuario) => {
    return {
        nome: usuario.nome,
        email: usuario.email,
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
    usuarioCreateFormatter
};