const Expense = require('../models/Expenses');

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('account');
    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate('account');
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ expense });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
