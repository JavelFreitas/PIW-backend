const { app } = require('./src/config/api');
const { usuarioRouter } = require('./src/routes/usuario');
const { postRouter } = require('./src/routes/post');

app.use('/usuarios', usuarioRouter);
app.use('/posts', postRouter);

app.listen(process.env.NODE_PORT || 3333, () => {
    console.log("Server rodando"); 
});