const TaxRate = require("../models/TaxRates");

exports.getTaxRates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const taxRates = await TaxRate.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(taxRates);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createTaxRate = async (req, res) => {
  const { title, type, value } = req.body;
  try {
    const newTaxRate = new TaxRate({ title, type, value });
    await newTaxRate.save();
    res.status(201).json(newTaxRate);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

exports.updateTaxRate = async (req, res) => {
  const { id } = req.params;
  const { title, type, value } = req.body;
  try {
    const taxRate = await TaxRate.findByIdAndUpdate(
      id,
      { title, type, value, updatedAt: new Date() },
      { new: true }
    );
    if (!taxRate)
      return res.status(404).json({ message: "Tax Rate not found" });
    res.json(taxRate);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

exports.updateDefault = async (req, res) => {
  const { id } = req.params;
  const { isDefault } = req.body;

  try {
    if (isDefault === null) {
      res.status(400).json({
        success: false,
        message: "please provide a default value",
      });
    }

    // Updated previous default
    const defaultCharge = await TaxRate.findOne({ isDefault: true });
    if (defaultCharge) {
      defaultCharge.isDefault = false;
      await defaultCharge.save();
    }

    // Created New Default
    const charge = await TaxRate.findByIdAndUpdate(
      id,
      { isDefault },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: `${charge.title} default value updated`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTaxRate = async (req, res) => {
  const { id } = req.params;
  try {
    const taxRate = await TaxRate.findByIdAndDelete(id);
    if (!taxRate)
      return res.status(404).json({ message: "Tax Rate not found" });
    res.json({ message: "Tax Rate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
