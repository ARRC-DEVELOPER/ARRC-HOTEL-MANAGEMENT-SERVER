const moment = require("moment");
const SalesSummary = require("../models/salesSummaryStatsModel");
const Order = require("../models/Orders.js");
const Purchase = require("../models/Purchase");
const Supplier = require("../models/Supplier");
const Customer = require("../models/Customers");

const salesSummaryStatsServices = {
  createSalesSummary: async () => {
    try {
      const startOfDay = moment().utc().startOf("day").toDate();
      const endOfDay = moment().utc().endOf("day").toDate();

      // Fetch all orders and purchases for today in UTC
      const orders = await Order.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      });

      const purchases = await Purchase.find({
        purchaseDate: { $gte: startOfDay, $lte: endOfDay },
      });

      const customers = await Customer.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      });

      const suppliers = await Supplier.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      });

      // Calculate sales data for today
      const orderQuantity = orders.length;
      const subTotal = orders.reduce((sum, order) => sum + order.subTotal, 0);
      const discount = orders.reduce((sum, order) => sum + order.discount, 0);
      const tax = orders.reduce((sum, order) => sum + order.tax, 0);
      const charge = orders.reduce((sum, order) => sum + order.charge, 0);
      const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      const totalExcludingTax = total - (tax / 100) * subTotal;
      const expense = purchases.reduce(
        (sum, purchase) => sum + purchase.totalBill,
        0
      );
      const customerDue = customers.reduce(
        (sum, customer) => sum + customer.dues,
        0
      );
      const supplierDue = suppliers.reduce(
        (sum, supplier) => sum + supplier.dues,
        0
      );

      // Now calculate overall stats
      const overAllOrders = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
          },
        },
      ]);

      const overAllPurchases = await Purchase.aggregate([
        {
          $group: {
            _id: null,
            totalPurchases: { $sum: "$totalBill" },
          },
        },
      ]);

      const overAllSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);

      const overAllTaxes = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalTaxes: { $sum: "$tax" },
          },
        },
      ]);

      const overAllDiscounts = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalDiscounts: { $sum: "$discount" },
          },
        },
      ]);

      const overAllExpenses = await Purchase.aggregate([
        {
          $group: {
            _id: null,
            totalExpenses: { $sum: "$totalBill" },
          },
        },
      ]);

      // Counting of orders on the basis of it's type
      const orderTypeCounts = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $group: {
            _id: "$orderType",
            count: { $sum: 1 },
          },
        },
      ]);

      const orderTypeSummary = orderTypeCounts.reduce((summary, type) => {
        summary[type._id] = type.count;
        return summary;
      }, {});

      // Create or update the sales summary for today
      await SalesSummary.findOneAndUpdate(
        { date: startOfDay },
        {
          date: startOfDay,
          orderQuantity,
          subTotal,
          discount,
          tax,
          charge,
          total,
          totalExcludingTax,
          purchase: expense,
          expense,
          customerDue,
          supplierDue,
          overAllOrders: overAllOrders[0]?.totalOrders || 0,
          overAllPurchases: overAllPurchases[0]?.totalPurchases || 0,
          overAllSales: overAllSales[0]?.totalSales || 0,
          overAllTaxes: overAllTaxes[0]?.totalTaxes || 0,
          overAllDiscounts: overAllDiscounts[0]?.totalDiscounts || 0,
          overAllExpenses: overAllExpenses[0]?.totalExpenses || 0,
          orderTypeSummary,
        },
        { upsert: true }
      );
    } catch (error) {
      console.error("Error in createSalesSummary:", error);
    }
  },
};

module.exports = {
  salesSummaryStatsServices,
};
