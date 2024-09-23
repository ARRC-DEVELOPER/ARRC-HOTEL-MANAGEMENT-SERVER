// controllers/modifierController.js
const Modifier = require('../models/Modifiers');

// Create a new modifier
exports.createModifier = async (req, res) => {
    try {
        const newModifier = new Modifier(req.body);
        await newModifier.save();
        res.status(201).json(newModifier);
    } catch (error) {
        res.status(500).json({ message: 'Error creating modifier', error });
    }
};

// Get all modifiers
exports.getModifiers = async (req, res) => {
    try {
        const modifiers = await Modifier.find();
        res.status(200).json(modifiers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching modifiers', error });
    }
};

// Get a modifier by ID
exports.getModifierById = async (req, res) => {
    try {
        const modifier = await Modifier.findById(req.params.id);
        if (!modifier) return res.status(404).json({ message: 'Modifier not found' });
        res.status(200).json(modifier);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching modifier', error });
    }
};

// Update a modifier
exports.updateModifier = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const modifier = await Modifier.findByIdAndUpdate(id, req.body, { new: true });
        if (!modifier) return res.status(404).json({ message: 'Modifier not found' });
        res.status(200).json(modifier);
    } catch (error) {
        res.status(500).json({ message: 'Error updating modifier', error });
    }
};
// Delete a modifier
exports.deleteModifier = async (req, res) => {
    try {
        const modifier = await Modifier.findByIdAndDelete(req.params.id);
        if (!modifier) return res.status(404).json({ message: 'Modifier not found' });
        res.status(200).json({ message: 'Modifier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting modifier', error });
    }
};
