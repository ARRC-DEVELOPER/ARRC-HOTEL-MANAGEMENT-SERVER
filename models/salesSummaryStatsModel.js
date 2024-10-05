const mongoose = require("mongoose");

const salesSummarySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },

    orderQuantity: {
      type: Number,
      default: 0,
    },

    subTotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    charge: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    purchase: {
      type: Number,
      default: 0,
    },

    expense: {
      type: Number,
      default: 0,
    },

    totalExcludingTax: {
      type: Number,
      default: 0,
    },

    customerDue: {
      type: Number,
      default: 0,
    },

    supplierDue: {
      type: Number,
      default: 0,
    },

    overAllOrders: {
      type: Number,
      default: 0,
    },

    overAllPurchases: {
      type: Number,
      default: 0,
    },

    overAllSales: {
      type: Number,
      default: 0,
    },

    overAllExpenses: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesSummary", salesSummarySchema);
