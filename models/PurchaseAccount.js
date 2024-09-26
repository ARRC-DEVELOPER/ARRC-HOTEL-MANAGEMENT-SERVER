const mongoose = require("mongoose");

const PurchaseAccountSchema = new mongoose.Schema({
  name: {
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

const PurchaseAccounts = mongoose.model("PurchaseAccounts", PurchaseAccountSchema);
module.exports = PurchaseAccounts;
