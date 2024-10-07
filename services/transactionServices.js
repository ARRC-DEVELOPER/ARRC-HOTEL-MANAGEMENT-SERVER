const Transaction = require("../models/Transactions.js");

const transactionServices = {
  createTransaction: async (insertObj) => {
    return await Transaction.create(insertObj);
  },

  deleteMe: async (transactionId) => {
    return await Transaction.findByIdAndDelete(transactionId);
  },

  findTransaction: async (transactionId) => {
    return await Transaction.findById(transactionId);
  },

  findAllTransactions: async () => {
    return await Transaction.find();
  },
};

module.exports = {
  transactionServices,
};
