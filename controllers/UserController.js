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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter all fields", 400));
    }

    const user = await checkUserExists(email);
    if (!user) {
      return next(new ErrorHandler("User dosen't exist.", 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorHandler("Incorrect email or password.", 401));
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

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user) {
      res.json(user);
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
      res.json({ message: "User deleted" });
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
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
