const express = require("express");
// importing controllers
const {
  getAllPurchaseAccounts,
  createPurchaseAccount,
} = require("../controllers/PurchaseAccountController");

const router = express.Router();

router.get("/getAllPurchaseAccounts", getAllPurchaseAccounts);
router.post("/createPurchaseAccount", createPurchaseAccount);

module.exports = router;
