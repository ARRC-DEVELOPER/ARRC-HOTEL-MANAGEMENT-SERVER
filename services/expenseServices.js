const Expense = require("../models/Expenses.js");

const expenseServices = {
  createExpense: async (insertObj) => {
    return await Expense.create(insertObj);
  },

  deleteMe: async (expenseId) => {
    return await Expense.findByIdAndDelete(expenseId);
  },

  findExpense: async (expenseId) => {
    return await Expense.findById(expenseId);
  },

  findAllExpenses: async (query) => {
    return await Expense.find(query);
  },
};

module.exports = {
  expenseServices,
};
