const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Percentage', 'Fixed'],
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        default: 'Admin'
    }
});

module.exports = mongoose.model('Charge', chargeSchema);
