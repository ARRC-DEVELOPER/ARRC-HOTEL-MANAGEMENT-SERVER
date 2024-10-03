const Cart = require("../models/Cart");
const FoodItem = require("../models/FoodItem");
const { userServices } = require("../services/userServices.js");
const { findUser } = userServices;

exports.addToCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = await FoodItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the item already exists in the cart
    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      cart = new Cart({ userId: user._id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.itemId == itemId);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice += item.price;
    } else {
      cart.items.push({
        itemId,
        name: item.itemName,
        price: item.price,
        totalPrice: item.price,
      });
    }

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart is Empty!" });
    }

    if (cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is Empty!" });
    }

    return res.status(200).json({
      success: true,
      message: "Cart Items fetched successfully!",
      cartItems: cart.items,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart is Empty!" });
    }

    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const item = cart.items[itemIndex];
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.totalPrice -= item.price;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Cart Item deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};
