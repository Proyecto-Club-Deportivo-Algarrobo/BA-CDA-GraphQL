const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    rut_from: {
        type: String,
        required: true,
    },
    rut_to: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Message', MessagesSchema);