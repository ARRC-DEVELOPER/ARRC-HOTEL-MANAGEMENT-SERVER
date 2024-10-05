const Customer = require("../models/Customers");
const { userServices } = require("../services/userServices.js");
const { findUser } = userServices;
const {
  salesSummaryStatsServices,
} = require("../services/salesSummaryStatsServices");
const { createSalesSummary } = salesSummaryStatsServices;

exports.getAllCustomers = async (req, res) => {
  const { search, from, to } = req.query;

  try {
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (from || to) {
      query.updatedAt = {};
      if (from) {
        query.updatedAt.$gte = new Date(from);
      }
      if (to) {
        query.updatedAt.$lte = new Date(to);
      }
    }

    const customers = await Customer.find(query);
    return res.status(200).json({
      success: true,
      message: "Customers fetched successfully!",
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const customer = new Customer(req.body);
    customer.updatedBy = user.username;
    await customer.save();

    return res.status(201).json({
      success: true,
      message: "Customer added successfully!",
      customer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: error.message });
  }
};

Customer.watch().on("change", async (change) => {
  await createSalesSummary();
});
