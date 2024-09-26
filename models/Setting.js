const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  appName: {
    type: String,
  },
  defaultCustomer: {
    type: String,
  },
  saleAccount: {
    type: String,
  },
  purchaseAccount: {
    type: String,
  },
  payrollAccount: {
    type: String,
  },
  copyright: {
    type: String,
  },
  sendInvoiceEmail: {
    type: Boolean,
    default: false
  },
  logo: {
    type: String
  },
  favicon: {
    type: String
  },
  preloader: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
