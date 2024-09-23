const Discount = require('../models/Discounts');

// Get all discounts
exports.getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new discount
exports.createDiscount = async (req, res) => {
    const { title, type, value } = req.body;
    try {
        const newDiscount = new Discount({ title, type, value });
        await newDiscount.save();
        res.status(201).json(newDiscount);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Update an existing discount
exports.updateDiscount = async (req, res) => {
    const { id } = req.params;
    const { title, type, value } = req.body;
    try {
        const discount = await Discount.findByIdAndUpdate(id, { title, type, value, updatedAt: new Date() }, { new: true });
        if (!discount) return res.status(404).json({ message: 'Discount not found' });
        res.json(discount);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Delete a discount
exports.deleteDiscount = async (req, res) => {
    const { id } = req.params;
    try {
        const discount = await Discount.findByIdAndDelete(id);
        if (!discount) return res.status(404).json({ message: 'Discount not found' });
        res.json({ message: 'Discount deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
