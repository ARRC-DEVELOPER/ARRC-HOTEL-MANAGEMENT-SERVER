const express = require("express");
const router = express.Router();
const taxRateController = require("../controllers/TaxRatesController");

router.get("/getTaxRates", taxRateController.getTaxRates);
router.post("/createTaxRate", taxRateController.createTaxRate);
router.put("/updateTaxRate/:id", taxRateController.updateTaxRate);
router.put("/updateDefault/:id", taxRateController.updateDefault);
router.delete("/deleteTaxRate/:id", taxRateController.deleteTaxRate);

module.exports = router;
