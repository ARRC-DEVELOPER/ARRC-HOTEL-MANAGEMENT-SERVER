const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { isAuthenticated } = require("../middlewares/auth.js");

router.post("/addToCart/:itemId", isAuthenticated, cartController.addToCart);
router.get("/getCart", isAuthenticated, cartController.getCart);
router.delete("/deleteFromCart/:itemId", isAuthenticated, cartController.deleteFromCart);

module.exports = router;
