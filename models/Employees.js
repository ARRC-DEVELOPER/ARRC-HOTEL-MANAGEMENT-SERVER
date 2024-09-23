const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  department: String,
  designation: String,
  shift: String,
  name: { type: String, required: true },
  joiningDate: Date,
  leavingDate: Date,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  presentAddress: String,
  permanentAddress: String,
  emergencyContact: String,
  nidNumber: String,
  gender: String,
  religion: String,
  maritalStatus: String,
  dob: Date,
  salaryType: String,
  salary: { type: Number, required: true },
  status: String,
  accountHolderName: String,
  accountNumber: String,
  bankName: String,
  bankIdentifierCode: String,
  branchLocation: String,
  taxPayerId: String,
  image: String, // URL of the image
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
