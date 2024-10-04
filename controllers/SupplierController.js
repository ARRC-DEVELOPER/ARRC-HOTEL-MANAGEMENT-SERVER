// controllers/supplierController.js

const Supplier = require("../models/Supplier");

exports.createSupplier = async (req, res) => {
  try {
    const { supplierName, email, phoneNumber, address } = req.body;
    const newSupplier = new Supplier({
      supplierName,
      email,
      phoneNumber,
      address,
    });
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSuppliers = async (req, res) => {
  const { from, to } = req.query;

  try {
    const filter = {};

    if (from || to) {
      filter.updatedAt = {};
      if (from) {
        filter.updatedAt.$gte = new Date(from);
      }
      if (to) {
        filter.updatedAt.$lte = new Date(to);
      }
    }

    const suppliers = await Supplier.find(filter);
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { supplierName, email, phoneNumber, address } = req.body;
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { supplierName, email, phoneNumber, address },
      { new: true }
    );
    if (!updatedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
