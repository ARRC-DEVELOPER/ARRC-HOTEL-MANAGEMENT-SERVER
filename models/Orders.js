const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderType: {
      type: String,
      enum: ["DineIn", "Pickup", "Delivery"],
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItem",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    subTotal: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    charge: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    dineInDetails: {
      guest: { type: Number },
      table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
      },
      waiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },

    deliveryDetails: {
      driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },

    pickupDetails: {
      waiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["Pending", "InProgress", "Completed"],
        default: "Pending",
      },
    },

    orderReady: {
      type: Boolean,
      default: false,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "UnPaid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
