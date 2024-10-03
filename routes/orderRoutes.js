const express = require('express');
const router = express.Router();
const orderController = require("../controllers/OrderController");
const { isAuthenticated } = require("../middlewares/auth.js");

router.post('/createOrder', isAuthenticated, orderController.createOrder);
router.get('/getAllOrders', orderController.getAllOrders);
router.put('/updateOrderStatus/:orderId', orderController.updateOrderStatus);

module.exports = router;
