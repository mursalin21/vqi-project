const mongoose = require("mongoose");

const qaTrackerSchema = mongoose.Schema(
  {
    job_number: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    total_volume: {
      type: Number,
      required: true,
    },
    edited_volume: {
      type: Number,
      required: true,
    },
    task_received_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QaTracker = mongoose.model("QaTracker", qaTrackerSchema);

module.exports = QaTracker;
