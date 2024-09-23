const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
