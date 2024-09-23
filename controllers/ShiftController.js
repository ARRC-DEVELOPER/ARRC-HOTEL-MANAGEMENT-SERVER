const Shift = require('../models/Shift');

// Create Shift
exports.createShift = async (req, res) => {
  try {
    const { title, startAt, endAt } = req.body;
    const newShift = new Shift({
      title,
      startAt,
      endAt,
      updatedBy: 'Admin' // Placeholder for now
    });
    await newShift.save();
    res.status(201).json(newShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Shifts
exports.getShifts = async (req, res) => {
    try {
      const shifts = await Shift.find();
      res.status(200).json(shifts); // Ensure this returns an array
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Update Shift
exports.updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, startAt, endAt } = req.body;
    const updatedShift = await Shift.findByIdAndUpdate(
      id,
      {
        title,
        startAt,
        endAt,
        updatedBy: 'Admin', // Placeholder for now
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!updatedShift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json(updatedShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Shift
exports.deleteShift = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShift = await Shift.findByIdAndDelete(id);
    if (!deletedShift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json({ message: 'Shift deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
