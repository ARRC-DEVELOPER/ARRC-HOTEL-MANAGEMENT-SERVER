const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AccountController");

router.get("/getAccounts", accountController.getAccounts);
router.post("/createAccount", accountController.createAccount);
router.put("/updateAccount/:id", accountController.updateAccount);
router.delete("/deleteAccount/:id", accountController.deleteAccount);

module.exports = router;
