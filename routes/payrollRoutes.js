const express = require("express");
// importing controllers
const {
  getAllPayrollAccounts,
  createPayrollAccount,
} = require("../controllers/PayrollController");

const router = express.Router();

router.get("/getAllPayrollAccounts", getAllPayrollAccounts);
router.post("/createPayrollAccount", createPayrollAccount);

module.exports = router;
