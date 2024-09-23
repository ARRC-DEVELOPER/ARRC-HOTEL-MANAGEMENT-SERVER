const express = require("express");
// importing controllers
const {
  getAllSalesAccounts,
  createSalesAccount,
} = require("../controllers/SalesAccountController");

const router = express.Router();

router.get("/getAllSalesAccounts", getAllSalesAccounts);
router.post("/createSalesAccount", createSalesAccount);

module.exports = router;
