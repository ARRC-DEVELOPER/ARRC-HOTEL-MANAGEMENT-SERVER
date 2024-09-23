const express = require('express');
const router = express.Router();
const taxRateController = require('../controllers/TaxRatesController');

router.get('/', taxRateController.getTaxRates);
router.post('/', taxRateController.createTaxRate);
router.put('/:id', taxRateController.updateTaxRate);
router.delete('/:id', taxRateController.deleteTaxRate);

module.exports = router;
