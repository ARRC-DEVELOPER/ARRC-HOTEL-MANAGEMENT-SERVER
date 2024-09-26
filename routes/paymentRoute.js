const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/PaymentController');

router.get('/', paymentMethodController.getPaymentMethods);
router.post('/', paymentMethodController.createPaymentMethod);
router.put('/:id', paymentMethodController.updatePaymentMethod);
router.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;
