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
