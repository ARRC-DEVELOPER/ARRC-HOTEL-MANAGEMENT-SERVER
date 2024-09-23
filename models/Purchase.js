// models/Purchase.js
const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true
  },
  invoiceNo: {
    type: String,
    required: true
  },
  totalBill: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    required: true
  },
  dueAmount: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
