const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Define routes
router.post('/createUser', userController.createUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
