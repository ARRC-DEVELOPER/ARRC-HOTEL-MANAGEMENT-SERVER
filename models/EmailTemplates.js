const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  updatedBy: {
    type: String,
    default: "admin",
  },
});

module.exports = mongoose.model("EmailTemplate", emailTemplateSchema);
