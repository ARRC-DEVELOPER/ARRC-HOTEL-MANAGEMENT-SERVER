// controllers/departmentController.js
const Department = require('../models/Departments');

// Get all departments with pagination and search
exports.getDepartments = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (page - 1) * limit;
        
        const departments = await Department.find({
            title: { $regex: search, $options: 'i' }
        }).skip(skip).limit(Number(limit));
        
        const totalItems = await Department.countDocuments({
            title: { $regex: search, $options: 'i' }
        });
        
        res.json({ departments, totalItems });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
    }
};

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { title, updatedBy } = req.body;

        if (!title || !updatedBy) {
            return res.status(400).json({ message: 'Title and Updated By are required' });
        }

        const newDepartment = new Department({ title, updatedBy });
        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating department', error });
    }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, updatedBy } = req.body;

        if (!title || !updatedBy) {
            return res.status(400).json({ message: 'Title and Updated By are required' });
        }

        const updatedDepartment = await Department.findByIdAndUpdate(id, { title, updatedBy }, { new: true });
        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating department', error });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndDelete(id);

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting department', error });
    }
};
