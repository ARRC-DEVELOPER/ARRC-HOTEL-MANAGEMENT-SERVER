const express = require('express');
const {
  createShift,
  getShifts,
  updateShift,
  deleteShift
} = require('../controllers/ShiftController');
const router = express.Router();

router.post('/', createShift);
router.get('/', getShifts);
router.put('/:id', updateShift);
router.delete('/:id', deleteShift);

module.exports = router;
