// models/SystemSettings.js

const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema({
    defaultRegion: {
        type: String,
        required: true
    },
    defaultLanguage: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    currencyName: {
        type: String,
        required: true
    },
    currencySymbol: {
        type: String,
        required: true
    },
    currencyPosition: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
