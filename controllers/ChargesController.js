const Charge = require("../models/Charges");

exports.createCharge = async (req, res) => {
  try {
    const charge = new Charge(req.body);
    await charge.save();
    res.status(201).json(charge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCharges = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const charges = await Charge.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(charges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCharge = async (req, res) => {
  try {
    const charge = await Charge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(charge);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    const defaultCharge = await Charge.findOne({ isDefault: true });
    if (defaultCharge) {
      defaultCharge.isDefault = false;
      await defaultCharge.save();
    }

    // Created New Default
    const charge = await Charge.findByIdAndUpdate(
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

exports.deleteCharge = async (req, res) => {
  try {
    await Charge.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
