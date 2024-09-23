const FoodGroup = require("../models/FoodGroups");

// Create a new food group
exports.createFoodGroup = async (req, res) => {
  try {
    const { groupName, status, updatedBy } = req.body;
    const image = req.file ? req.file.location : null; // Image URL from S3

    const newFoodGroup = new FoodGroup({
      groupName,
      status,
      image,
      updatedBy,
    });

    await newFoodGroup.save();
    res.status(201).json(newFoodGroup);
  } catch (error) {
    res.status(500).json({ message: "Error creating food group", error });
  }
};

// Get all food groups
exports.getFoodGroups = async (req, res) => {
  try {
    const foodGroups = await FoodGroup.find();
    res.status(200).json(foodGroups);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food groups", error });
  }
};

// Update a food group
exports.updateFoodGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { groupName, status, updatedBy } = req.body;
    const image = req.file ? req.file.location : req.body.image; // Update image if provided

    const updatedFoodGroup = await FoodGroup.findByIdAndUpdate(
      id,
      { groupName, status, image, updatedAt: Date.now(), updatedBy },
      { new: true }
    );

    if (!updatedFoodGroup) {
      return res.status(404).json({ message: "Food group not found" });
    }

    res.status(200).json(updatedFoodGroup);
  } catch (error) {
    res.status(500).json({ message: "Error updating food group", error });
  }
};

// Delete a food group
exports.deleteFoodGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFoodGroup = await FoodGroup.findByIdAndDelete(id);

    if (!deletedFoodGroup) {
      return res.status(404).json({ message: "Food group not found" });
    }

    res.status(200).json({ message: "Food group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food group", error });
  }
};
