const express = require('express');
const router = express.Router();
const transferController = require('../controllers/tranferController');

router.get('/', transferController.getAllTransfers);
router.get('/date-range', transferController.getTransfersByDateRange);
router.post('/', transferController.createTransfer);
router.put('/:id', transferController.updateTransfer);
router.delete('/:id', transferController.deleteTransfer);

module.exports = router;
