const Expense = require("../models/Expenses.js");
const Account = require("../models/Accounts.js");
const { expenseServices } = require("../services/expenseServices.js");
const { findAllExpenses } = expenseServices;

exports.getExpenses = async (req, res) => {
  const { accountId, fromDate, toDate } = req.query;

  try {
    let query = {};
    if (accountId) {
      const account = await Account.findById(accountId);
      if (!account) {
        res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }
      query.accountId = accountId;
    }

    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(new Date(fromDate).setHours(0, 0, 0)),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59)),
      };
    }

    const expenses = await findAllExpenses(query);
    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate("account");
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ expense });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
