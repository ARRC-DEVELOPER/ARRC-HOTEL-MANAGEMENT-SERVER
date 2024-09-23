// models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        required: true
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
