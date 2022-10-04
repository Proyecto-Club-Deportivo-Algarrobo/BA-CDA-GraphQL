const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
    "tamaño_bloque": {
        type: String,
        required: true
    },
    "dias": {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Horario', HorarioSchema);