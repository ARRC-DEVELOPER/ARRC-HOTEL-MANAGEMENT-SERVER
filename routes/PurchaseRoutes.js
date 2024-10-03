// routes/purchaseRoutes.js
const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseControllers.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.get("/getAllPurchases", purchaseController.getAllPurchases);
router.get("/filterPurchases", purchaseController.filterPurchases);
router.post("/addPurchase", isAuthenticated, purchaseController.addPurchase);
router.put("/updatePurchase/:id", purchaseController.updatePurchase);
router.delete("/deletePurchase/:id", purchaseController.deletePurchase);

module.exports = router;
