// Definir el esquema de esta entidad

const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 10
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function (url) {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);

            }
        }

    },
    fecha: {
        type: Date,
        required: true
    },
    color: mongoose.Schema.Types.Mixed
    // color: [] <-- Esto es tipo Mixed igualmente
});

const Imagen = mongoose.model('imagenes', imagenSchema);

module.exports = Imagen;