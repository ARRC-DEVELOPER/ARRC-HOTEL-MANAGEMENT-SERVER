const moment = require("moment");
const SalesSummary = require("../models/salesSummaryStatsModel");

exports.getSalesSummary = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      success: false,
      message: "fromDate and toDate are required.",
    });
  }

  try {
    const from = moment(req.query.from).utc().startOf("day").toDate();
    const to = moment(req.query.to).utc().endOf("day").toDate();

    const salesSummaries = await SalesSummary.find({
      date: { $gte: from, $lte: to },
    });

    const totalSummary = salesSummaries.reduce(
      (totals, summary) => {
        totals.orderQuantity += summary.orderQuantity;
        totals.subTotal += summary.subTotal;
        totals.charge += summary.charge;
        totals.discount += summary.discount;
        totals.tax += summary.tax;
        totals.total += summary.total;
        totals.expense += summary.expense;
        totals.purchase += summary.purchase;
        totals.totalExcludingTax += summary.totalExcludingTax;
        return totals;
      },
      {
        orderQuantity: 0,
        subTotal: 0,
        charge: 0,
        discount: 0,
        tax: 0,
        total: 0,
        totalExcludingTax: 0,
        expense: 0,
        purchase: 0,
      }
    );

    res.status(200).json({
      success: true,
      data: totalSummary,
    });
  } catch (error) {
    console.error("Error fetching sales summary:", error);
    res
      .status(500)
      .json({ message: "Error fetching sales summary", error: error.message });
  }
};

exports.getTodaysSummary = async (req, res) => {
  try {
    const startOfDay = moment().utc().startOf("day").toDate();
    const endOfDay = moment().utc().endOf("day").toDate();

    // Find today's sales summary
    const todaysSummary = await SalesSummary.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!todaysSummary) {
      return res.status(404).json({
        success: false,
        message: "No sales summary found for today.",
      });
    }

    res.status(200).json({
      success: true,
      data: todaysSummary,
    });
  } catch (error) {
    console.error("Error fetching sales summary:", error);
    res
      .status(500)
      .json({ message: "Error fetching sales summary", error: error.message });
  }
};

exports.monthlySummary = async (req, res) => {
  try {
    const startOfMonth = moment().utc().startOf("month").toDate();
    const endOfMonth = moment().utc().endOf("month").toDate();

    const monthlySummaries = await SalesSummary.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Aggregate monthly totals
    const totalOrders = monthlySummaries.reduce(
      (sum, summary) => sum + summary.orderQuantity,
      0
    );

    const totalSubTotal = monthlySummaries.reduce(
      (sum, summary) => sum + summary.subTotal,
      0
    );

    const totalDiscount = monthlySummaries.reduce(
      (sum, summary) => sum + summary.discount,
      0
    );
    const totalTax = monthlySummaries.reduce(
      (sum, summary) => sum + summary.tax,
      0
    );
    const totalCharge = monthlySummaries.reduce(
      (sum, summary) => sum + summary.charge,
      0
    );
    const totalSales = monthlySummaries.reduce(
      (sum, summary) => sum + summary.total,
      0
    );
    const totalExpenses = monthlySummaries.reduce(
      (sum, summary) => sum + summary.expense,
      0
    );
    const totalPurchase = monthlySummaries.reduce(
      (sum, summary) => sum + summary.purchase,
      0
    );
    const totalCustomerDue = monthlySummaries.reduce(
      (sum, summary) => sum + summary.customerDue,
      0
    );
    const totalSupplierDue = monthlySummaries.reduce(
      (sum, summary) => sum + summary.supplierDue,
      0
    );

    const monthlySummary = {
      month: moment().format("MMMM YYYY"),
      totalOrders,
      totalSubTotal,
      totalDiscount,
      totalTax,
      totalCharge,
      totalSales,
      totalExpenses,
      totalPurchase,
      totalCustomerDue,
      totalSupplierDue,
    };

    res.status(200).json({
      message: "Monthly summary fetched successfully",
      monthlySummary,
    });
  } catch (error) {
    console.error("Error fetching sales summary:", error);
    res
      .status(500)
      .json({ message: "Error fetching sales summary", error: error.message });
  }
};

exports.getYearlySalesSummary = async (req, res) => {
  try {
    const startOfYear = moment().utc().startOf("year").toDate();
    const currentMonth = moment().utc().endOf("month").toDate();

    const summaries = await SalesSummary.aggregate([
      {
        $match: { date: { $gte: startOfYear, $lte: currentMonth } },
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalSales: { $sum: "$total" },
          totalTaxes: { $sum: "$tax" },
          totalDiscounts: { $sum: "$discount" },
          totalExpenses: { $sum: "$expense" },
          totalPurchases: { $sum: "$purchase" },
          totalDinein: { $sum: { $ifNull: ["$orderTypeSummary.DineIn", 0] } },
          totalPickup: { $sum: { $ifNull: ["$orderTypeSummary.Pickup", 0] } },
          totalDelivery: {
            $sum: { $ifNull: ["$orderTypeSummary.Delivery", 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthlyData = Array(12).fill({
      totalSales: 0,
      totalTaxes: 0,
      totalDiscounts: 0,
      totalExpenses: 0,
      totalPurchases: 0,
      totalDinein: 0,
      totalPickup: 0,
      totalDelivery: 0,
    });

    summaries.forEach((summary) => {
      monthlyData[summary._id - 1] = summary;
    });

    res.status(200).json({
      success: true,
      data: monthlyData,
    });
  } catch (error) {
    console.error("Error fetching sales summary:", error);
    res
      .status(500)
      .json({ message: "Error fetching sales summary", error: error.message });
  }
};
