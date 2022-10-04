const mongoose = require('mongoose');

const crearDia = new mongoose.Schema({
    cantidad_bloques: {
        type: Number,
        required: true,
        trim: true
    },
    no_disponible: {
        type: Array
    },
});

module.exports = mongoose.model('crearDia', crearDia);