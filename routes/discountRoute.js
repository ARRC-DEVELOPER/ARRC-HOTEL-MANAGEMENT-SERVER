const express = require('express');
const router = express.Router();
const discountController = require('../controllers/DiscountsController');

router.get('/getDiscounts', discountController.getDiscounts);
router.post('/createDiscount', discountController.createDiscount);
router.put('/updateDiscount/:id', discountController.updateDiscount);
router.put("/updateDefault/:id", discountController.updateDefault);
router.delete('/deleteDiscount/:id', discountController.deleteDiscount);

module.exports = router;
