// src/routes/holidayRoutes.js
const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/HolidayController');

router.get('/', holidayController.getAllHolidays);
router.post('/', holidayController.createHoliday);
router.put('/:id', holidayController.updateHoliday);
router.delete('/:id', holidayController.deleteHoliday);

module.exports = router;
