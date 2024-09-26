const express = require('express');
const router = express.Router();
const CompanyController = require("../controllers/CompanyController");

router.get('/getCompanyDetails', CompanyController.getCompanyDetails);
router.post('/updateCompanyDetails', CompanyController.updateCompanyDetails);

module.exports = router;
