const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  appName: { type: String, required: true },
  defaultCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  saleAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleAccount', required: true },
  purchaseAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseAccount', required: true },
  payrollAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'PayrollAccount', required: true },
  copyright: { type: String, required: true },
  sendInvoiceEmail: { type: Boolean, default: false },
  logo: { type: String },
  favicon: { type: String },
  preloader: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
