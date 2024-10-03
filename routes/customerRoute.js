const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");
const { isAuthenticated } = require("../middlewares/auth.js");

// Define routes
router.get("/getAllCustomers", customerController.getAllCustomers);
router.get("/getCustomerById/:id", customerController.getCustomerById);
router.post("/createCustomer", isAuthenticated, customerController.createCustomer);
router.put("/updateCustomer/:id", customerController.updateCustomer);
router.delete("/deleteCustomer/:id", customerController.deleteCustomer);

module.exports = router;
