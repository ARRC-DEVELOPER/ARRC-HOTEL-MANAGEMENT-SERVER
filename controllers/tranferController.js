const Transfer = require('../models/Transfers');

// Get all transfers
exports.getAllTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.status(200).json({ transfers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transfers', error });
  }
};

// Get transfers by date range
exports.getTransfersByDateRange = async (req, res) => {
  const { fromDate, toDate } = req.query;
  try {
    const transfers = await Transfer.find({
      transferDate: { $gte: new Date(fromDate), $lte: new Date(toDate) }
    });
    res.status(200).json({ transfers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transfers', error });
  }
};

// Create a new transfer
exports.createTransfer = async (req, res) => {
  try {
    const newTransfer = new Transfer(req.body);
    await newTransfer.save();
    res.status(201).json({ message: 'Transfer created successfully', transfer: newTransfer });
  } catch (error) {
    res.status(400).json({ message: 'Error creating transfer', error });
  }
};

// Update a transfer
exports.updateTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransfer = await Transfer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTransfer) return res.status(404).json({ message: 'Transfer not found' });
    res.status(200).json({ message: 'Transfer updated successfully', transfer: updatedTransfer });
  } catch (error) {
    res.status(400).json({ message: 'Error updating transfer', error });
  }
};

// Delete a transfer
exports.deleteTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransfer = await Transfer.findByIdAndDelete(id);
    if (!deletedTransfer) return res.status(404).json({ message: 'Transfer not found' });
    res.status(200).json({ message: 'Transfer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transfer', error });
  }
};
