const { transactionServices } = require("../services/transactionServices.js");
const { findAllTransactions } = transactionServices;

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await findAllTransactions();
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
