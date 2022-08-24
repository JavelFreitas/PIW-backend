const { app } = require('./src/config/api');
const { usuarioRouter } = require('./src/routes/usuario');

app.use('/usuarios', usuarioRouter);

app.listen(process.env.NODE_PORT || 3333, () => {
    console.log("Server rodando");
});