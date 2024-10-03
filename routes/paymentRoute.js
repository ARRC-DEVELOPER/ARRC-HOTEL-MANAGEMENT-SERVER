const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/PaymentController');

router.get('/getPaymentMethods', paymentMethodController.getPaymentMethods);
router.post('/createPaymentMethod', paymentMethodController.createPaymentMethod);
router.put('/updatePaymentMethod/:id', paymentMethodController.updatePaymentMethod);
router.delete('/deletePaymentMethod/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;
