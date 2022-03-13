const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    line1: {
        type: String,
        max: 300,
        required: true
    },
    line2: {
        type: String,
        max: 300,
        required: false
    },
    city: {
        type: String,
        max: 50,
        required: true
    },
    state: {
        type: String,
        max: 50,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Address', addressSchema);