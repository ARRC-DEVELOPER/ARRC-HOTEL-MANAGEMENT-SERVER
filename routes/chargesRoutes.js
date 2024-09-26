const express = require('express');
const router = express.Router();
const chargeController = require('../controllers/ChargesController');

router.post('/createCharge', chargeController.createCharge);
router.get('/getCharges', chargeController.getCharges);
router.put('/updateCharge/:id', chargeController.updateCharge);
router.put("/updateDefault/:id", chargeController.updateDefault);
router.delete('/deleteCharge/:id', chargeController.deleteCharge);

module.exports = router;
