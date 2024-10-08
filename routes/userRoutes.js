const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { isAuthenticated, authorizedAdmin } = require("../middlewares/auth.js");

// Define routes
router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get(
  "/getAllUsers",
  isAuthenticated,
  authorizedAdmin,
  userController.getUsers
);
router.get(
  "/getAllWaiters",
  isAuthenticated,
  authorizedAdmin,
  userController.getAllWaiters
);
router.get(
  "/getAllDrivers",
  isAuthenticated,
  authorizedAdmin,
  userController.getAllDrivers
);
router.get("/getUser/:id", userController.getUserById);
router.put("/updateUser/:id", isAuthenticated, userController.updateUser);
router.put("/changePassword", isAuthenticated, userController.changePassword);
router.delete(
  "/delteUser/:id",
  isAuthenticated,
  authorizedAdmin,
  userController.deleteUser
);
router.get("/getMyProfile", isAuthenticated, userController.getMyProfile);

module.exports = router;
