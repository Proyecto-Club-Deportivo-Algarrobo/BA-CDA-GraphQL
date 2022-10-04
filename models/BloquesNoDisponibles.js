const mongoose = require('mongoose');

const BloquesNoDisponiblesSchema = new mongoose.Schema({
    "id": {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BloquesNoDisponibles', BloquesNoDisponiblesSchema);
