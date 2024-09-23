const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  fromAccount: { type: String, required: true },
  toAccount: { type: String, required: true },
  transferDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  note: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Transfer', transferSchema);
