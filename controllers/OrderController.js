const Order = require("../models/Orders.js");
const Customer = require("../models/Customers");
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

  try {
    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const customerPurchase = await Customer.findById(customer);
    if (!customerPurchase) {
      return res.status(404).json({ message: "Customer not found" });
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

    const savedOrder = await newOrder.save();
    if (savedOrder.paymentStatus == "Unpaid") {
      customerPurchase.dues += savedOrder.totalPrice;
    }
    customerPurchase.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating order", error });
  }
};

exports.getAllOrders = async (req, res) => {
  const { ordertype, fromDate, toDate, paymentStatus } = req.query;

  try {
    let query = {};

    if (ordertype) {
      query.orderType = { $regex: ordertype, $options: "i" };
    }

    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(new Date(fromDate).setHours(0, 0, 0)),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59)),
      };
    }

    if (paymentStatus && paymentStatus !== "All") {
      query.paymentStatus = paymentStatus;
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

exports.filterSales = async (req, res) => {
  const { period, from, to } = req.query;

  const fromDate = new Date(from);
  const toDate = new Date(to);

  let query = {};
  if (period === "daily") {
    query.createdAt = {
      $gte: new Date(fromDate.setHours(0, 0, 0, 0)),
      $lte: new Date(toDate.setHours(23, 59, 59, 999)),
    };
  } else if (period === "weekly") {
    query.createdAt = {
      $gte: new Date(fromDate.setHours(0, 0, 0, 0)),
      $lte: new Date(toDate.setHours(23, 59, 59, 999)),
    };
  } else if (period === "monthly") {
    query.createdAt = {
      $gte: new Date(fromDate.getFullYear(), fromDate.getMonth(), 1),
      $lte: new Date(
        toDate.getFullYear(),
        toDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      ),
    };
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid period selected",
    });
  }
  try {
    const sales = await Order.find(query);

    res.status(200).json({
      success: true,
      message: "Filtered sales reports",
      sales,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while fetching filtered Purchase reports",
    });
  }
};

exports.getOrderItemByDate = async (req, res) => {
  const { from, to } = req.query;

  try {
    const filter = {};

    if (from || to) {
      filter.createdAt = {};
      if (from) {
        filter.createdAt.$gte = new Date(from);
      }
      if (to) {
        filter.createdAt.$lte = new Date(to);
      }
    }

    const orders = await Order.find(filter)
      .populate("items.itemId")
      .select("items createdAt");

    const populatedItems = orders.flatMap((order) =>
      order.items.map((item) => item.itemId)
    );

    res.status(200).json(populatedItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ error: "Failed to fetch order items" });
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
