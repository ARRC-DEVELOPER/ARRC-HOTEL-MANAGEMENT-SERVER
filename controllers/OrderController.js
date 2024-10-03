const Order = require("../models/Orders.js");
const { userServices } = require("../services/userServices.js");
const { findUser } = userServices;

exports.createOrder = async (req, res) => {
  const {
    orderType,
    customer,
    items,
    subTotal,
    totalPrice,
    tax,
    discount,
    charge,
    dineInDetails,
    deliveryDetails,
    pickupDetails,
  } = req.body;

  console.log(req.body);

  try {
    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newOrder = new Order({
      userId: req.userId,
      orderType,
      customer,
      items,
      subTotal,
      tax,
      discount,
      charge,
      totalPrice,
      dineInDetails: orderType === "DineIn" ? dineInDetails : undefined,
      deliveryDetails: orderType === "Delivery" ? deliveryDetails : undefined,
      pickupDetails: orderType === "Pickup" ? pickupDetails : undefined,
    });

    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating order", error });
  }
};

exports.getAllOrders = async (req, res) => {
  const { ordertype } = req.query;

  try {
    let query = {};
    if (ordertype) {
      query = { orderType: { $regex: ordertype, $options: "i" } };
    }

    const orders = await Order.find(query)
      .populate("customer")
      .populate("items.itemId")
      .populate("dineInDetails.table")
      .populate("dineInDetails.waiter")
      .populate("deliveryDetails.driver")
      .populate("pickupDetails.waiter");

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully!",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating order",
      error,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await Order.findById(orderId);
    if (updatedOrder.orderReady) {
      updatedOrder.orderReady = false;
    } else {
      updatedOrder.orderReady = true;
    }

    return res.status(200).json({
      message: "Order status updated",
      orderReady: updatedOrder.orderReady,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating order status",
      error,
    });
  }
};
