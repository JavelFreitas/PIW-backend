let mockUsers = [
    {
        id: 1,
        nome: "Leticia Farias",
        email: "leticiaf@gmail.com",
        senha: "123"
    },
    {
        id: 2,
        nome: "Javel Queiroz",
        email: "javel@gmail.com",
        senha: "123"
    },
    {
        id: 3,
        nome: "Victor Farias",
        email: "victorF@gmail.com",
        senha: "123"
    },
]

const getUsuarios = async () => {
    return mockUsers
}

const getUsuarioById = async (id) => {
    return mockUsers.find(usuario => usuario.id === id);
}

const postUsuario = async (usuario) => {
    try {
        const idExists = mockUsers.find(mock => mock.id === usuario.id);
        if (idExists) throw new Error(`Usuario ${usuario.id} já existe`);
        mockUsers.push(usuario);
        return usuario;
    } catch (e) {
        return {
            message: e.message || "Could not insert student"
        }
    }
}

const deleteUsuario = async (usuario) => {
    try {
        const idExists = mockUsers.find(mock => mock.id === parseInt(usuario.id));
        if (!idExists) throw new Error(`Usuario ${usuario.id} não existe`);

        mockUsers = mockUsers.filter(user => !(user.id === parseInt(usuario.id)));

        return { message: "Usuario removido com sucesso" };
    } catch (e) {
        return {
            message: e.message || "Could not delete student"
        }
    }
}


module.exports = {
    getUsuarios,
    getUsuarioById,
    postUsuario,
    deleteUsuario
}