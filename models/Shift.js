const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startAt: {
      type: String,
      required: true,
      trim: true,
    },
    endAt: {
      type: String,
      required: true,
      trim: true,
    },
    updatedBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
