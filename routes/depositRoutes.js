const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');

// Create a new deposit
router.post('/', depositController.createDeposit);

// Get all deposits with optional filters
router.get('/', depositController.getDeposits);

// Update a deposit
router.put('/:id', depositController.updateDeposit);

// Delete a deposit
router.delete('/:id', depositController.deleteDeposit);

module.exports = router;
