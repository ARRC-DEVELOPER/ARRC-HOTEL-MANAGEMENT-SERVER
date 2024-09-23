// controllers/leaveRequestController.js
const LeaveRequest = require('../models/LeaveRequest');

exports.createLeaveRequest = async (req, res) => {
    try {
      const { employee, startDate, endDate, leaveType, status, note, updatedBy } = req.body;
  
      const newLeaveRequest = new LeaveRequest({
        employee,
        startDate,
        endDate,
        leaveType,
        status,
        note,
        updatedBy
      });
  
      await newLeaveRequest.save();
      res.status(201).json(newLeaveRequest);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getLeaveRequests = async (req, res) => {
  try {
    const { page = 1, search = '' } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const leaveRequests = await LeaveRequest.find({
      employee: new RegExp(search, 'i')
    }).skip(skip).limit(limit).sort({ createdAt: -1 });

    const totalLeaveRequests = await LeaveRequest.countDocuments({
      employee: new RegExp(search, 'i')
    });

    res.json({
      leaveRequests,
      totalPages: Math.ceil(totalLeaveRequests / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateLeaveRequest = async (req, res) => {
    try {
      const { id } = req.params;
      const { employee, startDate, endDate, leaveType, status, note, updatedBy } = req.body;
  
      const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(id, {
        employee,
        startDate,
        endDate,
        leaveType,
        status,
        note,
        updatedBy
      }, { new: true });
  
      res.status(200).json(updatedLeaveRequest);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
exports.deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const leaveRequest = await LeaveRequest.findByIdAndDelete(id);
    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    res.json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
