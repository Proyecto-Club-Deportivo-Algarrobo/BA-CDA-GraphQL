const mongoose = require('mongoose');

const DiasSchema = new mongoose.Schema({
    "lunes": {
        "cantidad_bloques": {
            type: Number,
            required: true
        }, 
        "inicio": {
            type: String,
            required: true
        },
        "no_disponible": {
            type: Array,
            required: false,
            default: []
        }
    },
    "martes": {
        "cantidad_bloques": {
            type: Number,
            required: true
        }, 
        "inicio": {
            type: String,
            required: true
        },
        "no_disponible": {
            type: Array,
            required: false,
            default: []
        }
    },
    "miercoles": {
        "cantidad_bloques": {
            type: Number,
            required: true
        }, 
        "inicio": {
            type: String,
            required: true
        },
        "no_disponible": {
            type: Array,
            required: false,
            default: []
        }
    },
    "jueves": {
        "cantidad_bloques": {
            type: Number,
            required: true
        }, 
        "inicio": {
            type: String,
            required: true
        },
        "no_disponible": {
            type: Array,
            required: false,
            default: []
        }
    },
    "viernes": {
        "cantidad_bloques": {
            type: Number,
            required: true
        }, 
        "inicio": {
            type: String,
            required: true
        },
        "no_disponible": {
            type: Array,
            required: false,
            default: []
        }
    },
    "sabado": {
        "cantidad_bloques": {
            type: Number,
            required: true
        }, 
        "inicio": {
            type: String,
            required: true
        },
        "no_disponible": {
            type: Array,
            required: false,
            default: []
        }
    },
    "domingo": {
        "cantidad_bloques": {
            type: Number,
            required: true
        }, 
        "inicio": {
            type: String,
            required: true
        },
        "no_disponible": {
            type: Array,
            required: false,
            default: []
        }
    }
});

module.exports = mongoose.model('Dias', DiasSchema);
