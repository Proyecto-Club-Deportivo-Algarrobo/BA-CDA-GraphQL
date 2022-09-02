const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    rut: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: { 
        type: String,
    },
    average: {
        type: Number
    }
});

module.exports = mongoose.model('User', UsersSchema);