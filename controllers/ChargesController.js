const Charge = require('../models/Charges');

// Create a new charge
exports.createCharge = async (req, res) => {
    try {
        const charge = new Charge(req.body);
        await charge.save();
        res.status(201).json(charge);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all charges with pagination
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

// Update a charge by ID
exports.updateCharge = async (req, res) => {
    try {
        const charge = await Charge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(charge);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a charge by ID
exports.deleteCharge = async (req, res) => {
    try {
        await Charge.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
