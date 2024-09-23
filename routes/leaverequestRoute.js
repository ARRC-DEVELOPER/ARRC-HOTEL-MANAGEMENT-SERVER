// routes/leaveRequestRoutes.js
const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/LeaveRequestController');

router.post('/', leaveRequestController.createLeaveRequest);
router.get('/', leaveRequestController.getLeaveRequests);
router.put('/:id', leaveRequestController.updateLeaveRequest);
router.delete('/:id', leaveRequestController.deleteLeaveRequest);

module.exports = router;
