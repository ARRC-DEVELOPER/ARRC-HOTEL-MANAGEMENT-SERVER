// backend/models/companyModel.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyPhone: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyTaxNumber: { type: String, required: true },
    companyAddress: { type: String, required: true }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
