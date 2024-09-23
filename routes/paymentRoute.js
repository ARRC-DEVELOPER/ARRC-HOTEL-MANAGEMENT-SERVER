const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/PaymentController');

// Get all payment methods
router.get('/', paymentMethodController.getPaymentMethods);


// Create a new payment method
router.post('/', paymentMethodController.createPaymentMethod);

// Update an existing payment method
router.put('/:id', paymentMethodController.updatePaymentMethod);

// Delete a payment method
router.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;
