const express = require('express');
const router = express.Router();
const chargeController = require('../controllers/ChargesController');

router.post('/charges', chargeController.createCharge);
router.get('/charges', chargeController.getCharges);
router.put('/charges/:id', chargeController.updateCharge);
router.delete('/charges/:id', chargeController.deleteCharge);

module.exports = router;
