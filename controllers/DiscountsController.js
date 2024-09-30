const Discount = require("../models/Discounts");

exports.getDiscounts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const discounts = await Discount.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createDiscount = async (req, res) => {
  const { title, type, value } = req.body;
  try {
    const newDiscount = new Discount({ title, type, value });
    await newDiscount.save();
    res.status(201).json(newDiscount);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

exports.updateDiscount = async (req, res) => {
  const { id } = req.params;
  const { title, type, value } = req.body;

  console.log(title, type, value);
  try {
    const discount = await Discount.findByIdAndUpdate(
      id,
      { title, type, value, updatedAt: new Date() },
      { new: true }
    );
    if (!discount)
      return res.status(404).json({ message: "Discount not found" });
    res.json(discount);
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
    const defaultCharge = await Discount.findOne({ isDefault: true });
    if (defaultCharge) {
      defaultCharge.isDefault = false;
      await defaultCharge.save();
    }

    // Created New Default
    const charge = await Discount.findByIdAndUpdate(
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

exports.deleteDiscount = async (req, res) => {
  const { id } = req.params;
  try {
    const discount = await Discount.findByIdAndDelete(id);
    if (!discount)
      return res.status(404).json({ message: "Discount not found" });
    res.json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
