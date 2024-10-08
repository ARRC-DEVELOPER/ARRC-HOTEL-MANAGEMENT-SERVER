const Account = require("../models/Accounts.js");
const { transactionServices } = require("../services/transactionServices.js");
const { findAllTransactions } = transactionServices;

exports.getTransactions = async (req, res) => {
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
      query.date = {
        $gte: new Date(new Date(fromDate).setHours(0, 0, 0)),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59)),
      };
    }

    const transactions = await findAllTransactions(query);
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
