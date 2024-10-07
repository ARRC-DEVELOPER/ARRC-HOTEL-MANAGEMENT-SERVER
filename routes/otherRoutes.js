const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController.js");

router.get("/getTransactions", transactionController.getTransactions);

module.exports = router;
