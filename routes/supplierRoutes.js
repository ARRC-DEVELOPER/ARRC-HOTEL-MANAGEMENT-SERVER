// routes/supplierRoutes.js

const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/SupplierController');

// Define routes
router.post('/createSupplier', supplierController.createSupplier);
router.get('/getSuppliers', supplierController.getSuppliers);
router.get('/getSupplierById/:id', supplierController.getSupplierById);
router.put('/updateSupplier/:id', supplierController.updateSupplier);
router.delete('/deleteSupplier/:id', supplierController.deleteSupplier);

module.exports = router;
