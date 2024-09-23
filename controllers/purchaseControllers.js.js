// controllers/purchaseController.js
const Purchase = require('../models/Purchase');

// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new purchase
exports.addPurchase = async (req, res) => {
  const { supplierId, invoiceNo, totalBill, paidAmount, dueAmount, purchaseDate, updatedBy } = req.body;
  const newPurchase = new Purchase({
    supplierId,
    invoiceNo,
    totalBill,
    paidAmount,
    dueAmount,
    purchaseDate,
    updatedBy
  });

  try {
    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a purchase
exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a purchase
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.json({ message: 'Purchase deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
