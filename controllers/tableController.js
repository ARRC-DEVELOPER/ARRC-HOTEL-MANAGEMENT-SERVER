const Table = require('../models/Tables');

// Get all tables
const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
};

// Add a new table
const addTable = async (req, res) => {
  try {
    const { tableName, reserved } = req.body;
    const image = req.file ? req.file.location : ''; // Get S3 URL from `req.file.location`

    const newTable = new Table({
      tableName,
      image,
      reserved: reserved === 'true'
    });

    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save table' });
  }
};

// Update a table
const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.image = req.file.location; // Get S3 URL from `req.file.location`
    }

    const updatedTable = await Table.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTable) {
      return res.status(404).json({ error: 'Table not found' });
    }
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update table' });
  }
};

// Delete a table
const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTable = await Table.findByIdAndDelete(id);
    if (!deletedTable) {
      return res.status(404).json({ error: 'Table not found' });
    }
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete table' });
  }
};

module.exports = {
  getAllTables,
  addTable,
  updateTable,
  deleteTable,
};
