const mongoose = require('mongoose');

const ValorHoraSchema = new mongoose.Schema({
    "tipoValor": {
        type: String,
        required: true
    },
    "valor": {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ValorHora', ValorHoraSchema);