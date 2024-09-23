// src/controllers/holidayController.js
const Holiday = require('../models/Holidays');

// Get all holidays with pagination and search
exports.getAllHolidays = async (req, res) => {
  try {
    const { page = 1, search = '', fromDate, toDate } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};

    // Handle search on note field
    if (search) {
      query.note = { $regex: search, $options: 'i' };
    }

    // Handle date range filter
    if (fromDate || toDate) {
      query.fromDate = {};
      if (fromDate) {
        query.fromDate.$gte = new Date(fromDate);
      }
      if (toDate) {
        query.toDate = query.toDate || {};
        query.toDate.$lte = new Date(toDate);
      }
    }

    const holidays = await Holiday.find(query).skip(skip).limit(limit);
    const totalHolidays = await Holiday.countDocuments(query);

    res.json({
      holidays,
      totalPages: Math.ceil(totalHolidays / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new holiday
exports.createHoliday = async (req, res) => {
  const { fromDate, toDate, note } = req.body;

  try {
    const newHoliday = new Holiday({ fromDate, toDate, note });
    const savedHoliday = await newHoliday.save();
    res.status(201).json(savedHoliday);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a holiday by ID
exports.updateHoliday = async (req, res) => {
  const { id } = req.params;
  const { fromDate, toDate, note } = req.body;

  try {
    const updatedHoliday = await Holiday.findByIdAndUpdate(id, { fromDate, toDate, note, updatedAt: Date.now() }, { new: true });
    res.json(updatedHoliday);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a holiday by ID
exports.deleteHoliday = async (req, res) => {
  const { id } = req.params;

  try {
    await Holiday.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
