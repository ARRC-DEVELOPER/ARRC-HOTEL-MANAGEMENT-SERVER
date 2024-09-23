const mongoose = require("mongoose");

const foodGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ["Active", "Inactive"], // Restrict status to "Active" or "Inactive"
    default: "Active", // Default value if not provided
  },
  image: { type: String },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String },
});

const FoodGroup = mongoose.model("FoodGroup", foodGroupSchema);

module.exports = FoodGroup;
