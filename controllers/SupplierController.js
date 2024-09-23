// controllers/supplierController.js

const Supplier = require('../models/Supplier'); // Adjust path as needed

// Create a new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { supplierName, email, phoneNumber, address } = req.body;
    const newSupplier = new Supplier({ supplierName, email, phoneNumber, address });
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update supplier by ID
exports.updateSupplier = async (req, res) => {
  try {
    const { supplierName, email, phoneNumber, address } = req.body;
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { supplierName, email, phoneNumber, address },
      { new: true }
    );
    if (!updatedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete supplier by ID
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
