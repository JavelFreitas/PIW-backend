const { app } = require('./src/config/api');
require('dotenv').config()
const { usuarioRouter } = require('./src/routes/usuario');
const { postRouter } = require('./src/routes/post');
const db = require('./src/config/database')

app.use('/api/usuarios', usuarioRouter);
app.use('/api/posts', postRouter);

db(process.env.DATABASE_URL);

app.listen(process.env.NODE_PORT || 3333, () => {
    console.log("Server rodando"); 
});