const Purchase = require("../models/Purchase");
const Supplier = require("../models/Supplier");
const { userServices } = require("../services/userServices.js");
const Account = require("../models/Accounts.js");
const { findUser } = userServices;
const moment = require("moment");
const {
  salesSummaryStatsServices,
} = require("../services/salesSummaryStatsServices");
const { createSalesSummary } = salesSummaryStatsServices;
const { transactionServices } = require("../services/transactionServices.js");
const { createTransaction } = transactionServices;
const { expenseServices } = require("../services/expenseServices.js");
const { createExpense } = expenseServices;

exports.getAllPurchases = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const purchases = await Purchase.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({
      success: true,
      message: "All Purchase reports",
      purchases,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Errror while fetching Purchase reports",
    });
  }
};

exports.filterPurchases = async (req, res) => {
  const { period, from, to } = req.query;

  const fromDate = new Date(from);
  const toDate = new Date(to);

  let query = {};
  if (period === "daily") {
    query.purchaseDate = {
      $gte: new Date(fromDate.setHours(0, 0, 0, 0)),
      $lte: new Date(toDate.setHours(23, 59, 59, 999)),
    };
  } else if (period === "weekly") {
    query.purchaseDate = {
      $gte: new Date(fromDate.setHours(0, 0, 0, 0)),
      $lte: new Date(toDate.setHours(23, 59, 59, 999)),
    };
  } else if (period === "monthly") {
    query.purchaseDate = {
      $gte: new Date(fromDate.getFullYear(), fromDate.getMonth(), 1),
      $lte: new Date(
        toDate.getFullYear(),
        toDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      ),
    };
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid period selected",
    });
  }

  try {
    const purchases = await Purchase.find(query);
    res.status(200).json({
      success: true,
      message: "Filtered Purchase reports",
      purchases,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while fetching filtered Purchase reports",
    });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const { from, to, period } = req.query;

    let startDate = from
      ? moment(from, "DD-MM-YYYY").startOf("day").toDate()
      : moment().subtract(1, "year").startOf("day").toDate();
    let endDate = to
      ? moment(to, "DD-MM-YYYY").endOf("day").toDate()
      : moment().endOf("day").toDate();

    const purchases = await Purchase.find({
      purchaseDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    let groupByFormat, periodLabel;

    switch (period) {
      case "weekly":
        groupByFormat = "YYYY-WW";
        periodLabel = (date) =>
          `Week of ${moment(date).startOf("week").format("DD MMM YYYY")}`;
        break;
      case "monthly":
        groupByFormat = "YYYY-MM";
        periodLabel = (date) => moment(date).format("MMMM YYYY");
        break;
      case "daily":
      default:
        groupByFormat = "YYYY-MM-DD";
        periodLabel = (date) => moment(date).format("DD MMM YYYY");
        break;
    }

    const expenseByPeriod = purchases.reduce((acc, purchase) => {
      const periodKey = moment(purchase.purchaseDate).format(groupByFormat);

      if (!acc[periodKey]) {
        acc[periodKey] = {
          period: periodLabel(purchase.purchaseDate),
          totalExpense: 0,
          purchases: [],
        };
      }

      acc[periodKey].totalExpense += purchase.totalBill;
      acc[periodKey].purchases.push(purchase);

      return acc;
    }, {});

    const result = Object.values(expenseByPeriod);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addPurchase = async (req, res) => {
  const {
    supplierId,
    ingredientId,
    paymentMethod,
    description,
    invoiceNo,
    totalBill,
    paidAmount,
    dueAmount,
    purchaseDate,
  } = req.body;

  try {
    const account = await Account.findById("67039d62307db2000efaeca8");
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.balance < paidAmount) {
      return res.status(400).json({ message: "Insufficient account balance" });
    }

    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.dues += dueAmount;

    const newPurchase = new Purchase({
      supplierId,
      ingredientId,
      paymentMethod,
      description,
      invoiceNo,
      totalBill,
      paidAmount,
      dueAmount,
      purchaseDate,
      updatedBy: user.role,
    });

    await createTransaction({
      accountId: account._id,
      accountNumber: account.number,
      type: "debit",
      amount: paidAmount,
      balance: account.balance - paidAmount,
      description: `Purchase #${newPurchase._id} - Invoice: ${invoiceNo}`,
    });

    await createExpense({
      accountId: account._id,
      accountNumber: account.number,
      amount: paidAmount,
      note: `Purchase #${newPurchase._id} - Invoice: ${invoiceNo}`,
    });

    account.balance -= paidAmount;
    account.debit += paidAmount;
    await account.save();

    const purchase = await newPurchase.save();
    supplier.save();

    res.status(201).json({
      success: true,
      message: "New Purchase Added",
      purchase,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!purchase)
      return res.status(404).json({ message: "Purchase not found" });
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase)
      return res.status(404).json({ message: "Purchase not found" });
    res.json({ message: "Purchase deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

Purchase.watch().on("change", async (change) => {
  await createSalesSummary();
});
