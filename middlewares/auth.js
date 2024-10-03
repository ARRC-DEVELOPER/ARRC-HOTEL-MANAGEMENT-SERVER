const jwt = require("jsonwebtoken");
const { userServices } = require("../services/userServices.js");
const { findUser } = userServices;

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(404).json({ message: "User not found" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await findUser(decoded._id);
  req.userId = decoded._id;

  next();
};

const authorizedAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource.`
      )
    );
  }

  next();
};

const authorizedSubscribers = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin") {
    return res
      .status(404)
      .json({ message: "Only subscribers can access this" });
  }

  next();
};

module.exports = {
  isAuthenticated,
  authorizedAdmin,
  authorizedSubscribers,
};
