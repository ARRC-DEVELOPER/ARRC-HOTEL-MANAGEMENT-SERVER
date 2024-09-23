const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  stock: { 
    type: String, 
    default: 'N/A',
    enum: ['In Stock', 'Out of Stock', 'Low Stock', 'N/A']
  },
  consumption: { 
    type: String, 
    default: 'N/A',
    enum: ['High', 'Medium', 'Low', 'N/A']
  },
});

const foodItemSchema = new mongoose.Schema({
  foodGroup: { 
    type: String, 
    required: true,
    enum: ['1', '2', '3', '4', '5', '6', '7'] // Add your options here
  },
  itemName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 }, // Added validation for positive price
  image: { type: String, required: true },
  ingredientItems: [ingredientSchema],
}, {
  timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
