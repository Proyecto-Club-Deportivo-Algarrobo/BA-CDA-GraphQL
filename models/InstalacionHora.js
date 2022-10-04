const mongoose = require('mongoose');

const InstalacionHoraSchema = new mongoose.Schema({
    "id": {
        type: String,
        required: true
    },
    "categoria": {
        type: String,
        required: true
    },
    "valorHora": {
        type: Array,
        required: true
    },
    "horario": {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('InstalacionHora', InstalacionHoraSchema);
