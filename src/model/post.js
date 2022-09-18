//id, texto, likes, id_usuario
const mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        texto: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value',
            }
        },
        id_usuario: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    })
    return mongoose.model('Post', schema);
}();
