// models/Modifier.js
const mongoose = require('mongoose');

const modifierSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    consumptions: [
        {
            name: {
                type: String,
                required: true,
            },
            stock: {
                type: String,
                required: true,
            },
            consumption: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    updatedBy: {
        type: String,
        default: 'Admin', // This can be dynamic based on your authentication
    },
});

module.exports = mongoose.model('Modifier', modifierSchema);
