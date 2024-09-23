const mongoose = require("mongoose");

const PayrollAccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },

  accountBalance: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PayrollAccounts = mongoose.model("PayrollAccounts", PayrollAccountSchema);
module.exports = PayrollAccounts;
