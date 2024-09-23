// backend/routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/CompanyController');

// POST route to create a company
router.post('/companies', companyController.createCompany);

// GET route to fetch company details
router.get('/companies', companyController.getCompany);

// PUT route to update a company
router.put('/companies', companyController.editCompany);

// DELETE route to remove a company
router.delete('/companies', companyController.deleteCompany);

module.exports = router;
