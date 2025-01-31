// controllers/ingredientController.js
const Ingredient = require("../models/Ingredient");

exports.getAllIngredients = async (req, res) => {
  const { from, to } = req.query;

  try {
    const filter = {};

    if (from || to) {
      filter.updatedAt = {};
      if (from) {
        filter.updatedAt.$gte = new Date(from);
      }
      if (to) {
        filter.updatedAt.$lte = new Date(to);
      }
    }

    const ingredients = await Ingredient.find(filter);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createIngredient = async (req, res) => {
  const { name, description, price, quantity, unit, alertQuantity, updatedBy } =
    req.body;
  const ingredient = new Ingredient({
    name,
    description,
    price,
    quantity,
    unit,
    alertQuantity,
    updatedBy,
  });

  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });

    Object.assign(ingredient, req.body);
    ingredient.updatedAt = Date.now();

    const updatedIngredient = await ingredient.save();
    res.json(updatedIngredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });

    await ingredient.remove();
    res.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
