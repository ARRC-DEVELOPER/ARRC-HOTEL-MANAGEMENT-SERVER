const FoodItem = require('../models/FoodItem');

// Create a new food item
const createFoodItem = async (req, res) => {
  try {
    const { foodGroup, itemName, description, price, ingredientItems } = req.body;
    const imageUrl = req.file ? req.file.location : ''; // URL of the uploaded image from S3

    const foodItem = new FoodItem({
      foodGroup,
      itemName,
      description,
      price,
      image: imageUrl, // URL from S3
      ingredientItems: ingredientItems ? JSON.parse(ingredientItems) : [],
    });

    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (error) {
    console.error('Error creating food item:', error.message);
    res.status(500).json({ error: `Failed to create food item: ${error.message}` });
  }
};

// Get all food items
const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
};

// Get a single food item by ID
const getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
};

// Update a food item by ID
const updateFoodItem = async (req, res) => {
  try {
    const { foodGroup, itemName, description, price, ingredientItems } = req.body;
    const updateData = {
      foodGroup,
      itemName,
      description,
      price,
      ingredientItems: ingredientItems ? JSON.parse(ingredientItems) : [],
    };

    if (req.file) {
      updateData.image = req.file.location; // Handle image upload
    }

    const foodItem = await FoodItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ error: `Failed to update food item: ${error.message}` });
  }
};


// Delete a food item by ID
const deleteFoodItem = async (req, res) => {
  try {
    const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};

module.exports = {
  createFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
};
