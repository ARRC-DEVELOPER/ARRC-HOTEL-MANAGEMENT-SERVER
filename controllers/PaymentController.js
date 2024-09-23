const PaymentMethod = require('../models/PaymentMethod');

// Get all payment methods
exports.getPaymentMethods = async (req, res) => {
    try {
        const methods = await PaymentMethod.find();
        res.json(methods);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new payment method
exports.createPaymentMethod = async (req, res) => {
    const { title } = req.body;
    try {
        const newMethod = new PaymentMethod({ title });
        await newMethod.save();
        res.status(201).json(newMethod);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Update an existing payment method
exports.updatePaymentMethod = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const method = await PaymentMethod.findByIdAndUpdate(id, { title }, { new: true });
        if (!method) return res.status(404).json({ message: 'Payment Method not found' });
        res.json(method);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
};

// Delete a payment method
exports.deletePaymentMethod = async (req, res) => {
    const { id } = req.params;
    try {
        const method = await PaymentMethod.findByIdAndDelete(id);
        if (!method) return res.status(404).json({ message: 'Payment Method not found' });
        res.json({ message: 'Payment Method deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
