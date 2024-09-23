const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  updatedBy: { type: String, default: 'Admin' }, // Example, change as needed
  updatedAt: { type: Date, default: Date.now }
});

const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;
