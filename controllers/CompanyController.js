// backend/controllers/companyController.js
const Company = require('../models/Company');

// Create company
exports.createCompany = async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json({ message: 'Company created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating company', error });
    }
};

// Get company details
exports.getCompany = async (req, res) => {
    try {
        const company = await Company.findOne(); // Adjust this if you need to find by ID or other criteria
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error });
    }
};

// Edit company
exports.editCompany = async (req, res) => {
    try {
        const company = await Company.findOneAndUpdate({}, req.body, { new: true });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company updated successfully!', company });
    } catch (error) {
        res.status(500).json({ message: 'Error updating company', error });
    }
};

// Delete company
exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOneAndDelete();
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company', error });
    }
};
