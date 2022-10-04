const mongoose = require('mongoose');

const BloquesAsignadosSchema = new mongoose.Schema({
    "id": {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BloquesAsignados', BloquesAsignadosSchema);
