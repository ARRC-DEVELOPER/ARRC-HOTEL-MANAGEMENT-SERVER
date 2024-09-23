const TaxRate = require('../models/TaxRates');

// Get all tax rates
exports.getTaxRates = async (req, res) => {
    try {
        const taxRates = await TaxRate.find();
        res.json(taxRates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new tax rate
exports.createTaxRate = async (req, res) => {
    const { title, type, value } = req.body;
    try {
        const newTaxRate = new TaxRate({ title, type, value });
        await newTaxRate.save();
        res.status(201).json(newTaxRate);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Update an existing tax rate
exports.updateTaxRate = async (req, res) => {
    const { id } = req.params;
    const { title, type, value } = req.body;
    try {
        const taxRate = await TaxRate.findByIdAndUpdate(id, { title, type, value, updatedAt: new Date() }, { new: true });
        if (!taxRate) return res.status(404).json({ message: 'Tax Rate not found' });
        res.json(taxRate);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Delete a tax rate
exports.deleteTaxRate = async (req, res) => {
    const { id } = req.params;
    try {
        const taxRate = await TaxRate.findByIdAndDelete(id);
        if (!taxRate) return res.status(404).json({ message: 'Tax Rate not found' });
        res.json({ message: 'Tax Rate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
