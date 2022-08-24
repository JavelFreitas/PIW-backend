let mockUsers = [
    {
        id: 1,
        name: "Leticia Farias",
        email: "leticiaf@gmail.com",
        senha: "123"
    },
    {
        id: 2,
        name: "Javel Queiroz",
        email: "javel@gmail.com",
        senha: "123"
    },
    {
        id: 3,
        name: "Victor Farias",
        email: "victorF@gmail.com",
        senha: "123"
    },
]

const getUsuarios = () => { 
    return mockUsers
}

const getUsuarioById = (id) => {
    return mockUsers.find(usuario => usuario.id === id);
}

const postUsuario = (usuario) => {
    try{
        const idExists = mockUsers.find(mock => mock.id === usuario.id);
        if(idExists) throw new Error(`Usuario ${usuario.id} já existe`);
        mockUsers.push(usuario);
        return usuario;
    }catch(e) {
        return {
            message: e.message || "Could not insert student"
        }
    }
}


module.exports = {
    getUsuarios,
    getUsuarioById,
    postUsuario
}