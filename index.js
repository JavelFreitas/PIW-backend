const { app } = require('./src/config/api');
const { usersRouter } = require('./src/routes/users');
app.get('/', (req, res) => {

    res.status(200).json({message: "deu certo"});
})

app.use('/users', usersRouter);

app.listen(process.env.NODE_PORT || 3333, () => {
    console.log("Server rodando");
});