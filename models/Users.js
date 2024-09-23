const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },

    email: { type: String, required: true },

    mobile: { type: String },

    password: { type: String },

    role: {
      type: String,
      enum: ["admin", "staff", "deliveryMan", "waiter"],
      default: "staff",
    },

    permissions: [{ type: String }],
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = mongoose.model("User", userSchema);
