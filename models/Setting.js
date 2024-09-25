const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  appName: {
    type: String,
    // required: true
  },
  defaultCustomer: {
    type: String,
    // required: true
  },
  saleAccount: {
    type: String,
    // required: true
  },
  purchaseAccount: {
    type: String,
    // required: true
  },
  payrollAccount: {
    type: String,
    // required: true
  },
  copyright: {
    type: String,
    // required: true
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
