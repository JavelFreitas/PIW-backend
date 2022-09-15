//id, texto, id_post, id_usuario
const mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        id_usuario: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        id_post: {
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
            required: true,
        },
        texto: {
            type: String,
            required: true,
        },
        
    })

    return mongoose.model('Comment', schema);
}();