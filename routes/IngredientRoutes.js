// routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/IngredientController');

// CRUD routes for ingredients
router.get('/getAllIngredients', ingredientController.getAllIngredients);
router.get('/getIngredientById/:id', ingredientController.getIngredientById);
router.post('/createIngredient', ingredientController.createIngredient);
router.put('/updateIngredient/:id', ingredientController.updateIngredient);
router.delete('/deleteIngredient/:id', ingredientController.deleteIngredient);

module.exports = router;
