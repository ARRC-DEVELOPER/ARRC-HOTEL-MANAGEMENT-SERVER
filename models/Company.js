const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    companyTaxNumber: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
