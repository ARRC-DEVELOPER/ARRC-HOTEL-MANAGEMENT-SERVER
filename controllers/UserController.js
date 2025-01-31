const User = require("../models/Users");
const { sendToken } = require("../utils/sendToken.js");
const { userServices } = require("../services/userServices.js");
const {
  checkUserExists,
  findUser,
  checkUserExistsWithResetToken,
  fetchAllUsers,
  findAndDelete,
  deleteMe,
} = userServices;

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllWaiters = async (req, res) => {
  try {
    const waiters = await User.find({ role: "waiter" });
    res.json(waiters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "deliveryMan" });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, mobile, password, role, permissions } = req.body;
  const user = new User({
    username,
    email,
    mobile,
    password,
    role,
    permissions,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  console.log(req.body);

  if (!oldPassword || !newPassword || !confirmPassword) {
    res.status(400).json({ message: "Please enter all fields" });
  }

  if (newPassword != confirmPassword) {
    res.status(400).json({ message: "Password not matched" });
  }

  const user = await findUser(req.userId);
  if (!user) {
    res.status(404).json({ message: "User Not Found" });
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    res.status(401).json({ message: "Incorrect password!" });
  }

  user.password = newPassword;
  user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully.",
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "Please enter all fields" });
    }

    const user = await checkUserExists(email);
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    sendToken(res, user, `${user.username}, Logged In Successfully.`, 200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "Development" ? false : true,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
};

const getMyProfile = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "Login First!" });
    }
    const user = await findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (newUser) {
      res.json(newUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.json({ message: `User ${user.username} deleted by admin.` });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  logout,
  getUsers,
  getAllWaiters,
  getAllDrivers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMyProfile,
  changePassword,
};
