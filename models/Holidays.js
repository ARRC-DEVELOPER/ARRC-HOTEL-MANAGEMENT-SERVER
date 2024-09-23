// src/models/Holiday.js
const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  note: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String, default: 'Admin' } // Example user; replace with actual user data if available
});

module.exports = mongoose.model('Holiday', holidaySchema);
