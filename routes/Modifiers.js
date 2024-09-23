// routes/modifierRoutes.js
const express = require('express');
const {
    createModifier,
    getModifiers,
    getModifierById,
    updateModifier,
    deleteModifier,
} = require('../controllers/ModifiersControllers');

const router = express.Router();

// Create a new modifier
router.post('/modifiers', createModifier);

// Get all modifiers
router.get('/modifiers', getModifiers);

// Get a single modifier by ID
router.get('/modifiers/:id', getModifierById);

// Update a modifier
router.put('/modifiers/:id', updateModifier);

// Delete a modifier
router.delete('/modifiers/:id', deleteModifier);

module.exports = router;
