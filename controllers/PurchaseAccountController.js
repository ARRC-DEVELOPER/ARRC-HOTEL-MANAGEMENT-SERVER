// importing model
const PurchaseAccount = require("../models/PurchaseAccount");

exports.getAllPurchaseAccounts = async (req, res, next) => {
  try {
    const allPurchaseAccounts = await PurchaseAccount.find({});

    return res.status(200).json({
      success: true,
      allPurchaseAccounts,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new customer
exports.createPurchaseAccount = async (req, res) => {
  try {
    const { accountName } = req.body;
    
    const customer = await PurchaseAccount.create({ accountName });

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
