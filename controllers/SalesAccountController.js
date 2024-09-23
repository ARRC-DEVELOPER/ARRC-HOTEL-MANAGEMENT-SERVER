// importing model
const Sales = require("../models/Sales");

exports.getAllSalesAccounts = async (req, res, next) => {
  try {
    const allSalesAccounts = await Sales.find({});

    return res.status(200).json({
      success: true,
      allSalesAccounts,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new customer
exports.createSalesAccount = async (req, res) => {
  try {
    const { accountName } = req.body;
    
    const customer = await Sales.create({ accountName });

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
