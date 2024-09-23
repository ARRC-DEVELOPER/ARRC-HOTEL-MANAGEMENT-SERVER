// models/leaveRequestModel.js
const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employee: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  },
  note: {
    type: String
  },
  updatedBy: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
