// importing model
const PayrollAccount = require("../models/PayrollAccounts");

exports.getAllPayrollAccounts = async (req, res, next) => {
  try {
    const allPayrollAccounts = await PayrollAccount.find({});

    return res.status(200).json({
      success: true,
      allPayrollAccounts,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new customer
exports.createPayrollAccount = async (req, res) => {
  try {
    const { accountName } = req.body;
    
    const customer = await PayrollAccount.create({ accountName });

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Error while creating salse account",
    });
  }
};
