const Account = require('../models/Accounts');

// Fetch accounts with pagination
exports.getAccounts = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const accounts = await Account.find()
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    const total = await Account.countDocuments();
    res.json({
      accounts,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts', error });
  }
};

// Create a new account
exports.createAccount = async (req, res) => {
  try {
    const { name, number, balance, note } = req.body;
    const newAccount = new Account({ name, number, balance, note });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
  }
};

// Update an existing account
exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAccount = await Account.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error updating account', error });
  }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    res.status(204).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error });
  }
};
