const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  note: { type: String },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String }, // Or you can use ObjectId if you have a User model
});

module.exports = mongoose.model('Expense', expenseSchema);
