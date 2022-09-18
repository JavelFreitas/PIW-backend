# Projeto de Interfaces WEB  


## Endpoints  

### Usuário  

- [x] (post) /api/usuarios

```json
{
    "nome": "Victor",
    "email": "victor.aefarias@gmail.com",
    "senha": "123"
}


```

- [x] (get) /api/usuarios
- [x] (get) /api/usuarios/:id
- [ ] (get) /api/usuarios/:id/posts
- [x] (delete) /api/usuarios/:id

### Post

- [x] (post) /api/posts

```json
{
    "texto": "Oi, tudo bem?",
    "likes": "6",
    "id_usuario": 1
}

```

- [x] (get) /api/posts
- [x] (get) /api/posts/:id
- [x] (get) /api/posts/:id/comentarios
- [x] (delete) /api/posts/:id

### Comentário

- [x] (post) /api/comentarios

```json
{
    "texto": "Tudo certo e contigo?",
    "id_post": 1,
    "id_usuario": 2
}

```

- [x] (get) /api/comentarios
- [x] (delete) /api/comentarios/:id
