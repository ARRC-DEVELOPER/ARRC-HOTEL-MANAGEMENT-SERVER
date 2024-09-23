const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  note: { type: String, default: '' },
  credit: { type: Number, default: 0 },
  debit: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String, default: 'System' }
});

module.exports = mongoose.model('Account', accountSchema);
