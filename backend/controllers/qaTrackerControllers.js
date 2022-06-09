const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const QaTracker = require("../models/qaTrackerModel");
const fs = require("fs");
const moment = require("moment");
const json2csv = require("json2csv").parse;
const path = require("path");
const fields = [
  "job_number",
  "email",
  "total_volume",
  "edited_volume",
  "task_received_date",
  "status",
  "updatedAt",
];

const getQaTasks = asyncHandler(async (req, res) => {
  const qaTasks = await QaTracker.find({ email: req.user.email });

  if (qaTasks) {
    res.json(qaTasks);
  } else {
    res.status(404);
    throw new Error("Tasks not Found!");
  }
});

const getAdminTasks = asyncHandler(async (req, res) => {
  const qaTasks = await QaTracker.find();

  if (qaTasks) {
    res.json(qaTasks);
  } else {
    res.status(404);
    throw new Error("Tasks not Found!");
  }
});

const getCsvFile = asyncHandler(async (req, res) => {
  const qaTasks = await QaTracker.find();

  if (qaTasks) {
    let csv;
    try {
      csv = json2csv(qaTasks, { fields });
    } catch (error) {
      return res.status(500).json({ error });
    }
    const dateTime = moment().format("YYYYMMDDhhmmss");
    const filePath = path.join(__dirname, "..", +dateTime + ".csv");
    fs.writeFile(filePath, csv, function (err) {
      if (err) {
        return res.json(err).status(500);
      } else {
        setTimeout(function () {
          fs.unlinkSync(filePath);
        }, 30000);
        // return res.json("/exports/csv-" + dateTime + ".csv");
        return res.csv(qaTasks, true);
      }
    });
  } else if (err) {
    return res.status(500).json({ err });
  }
});

const getTaskById = asyncHandler(async () => {
  const task = await QaTracker.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
  res.json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const {
    job_number,
    email,
    total_volume,
    edited_volume,
    task_received_date,
    status,
  } = req.body;

  const task = await QaTracker.findById(req.params.id);

  if (task) {
    task.job_number = job_number;
    task.email = email;
    task.total_volume = total_volume;
    task.edited_volume = edited_volume;
    task.task_received_date = task_received_date;
    task.status = status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    throw new Error("Task Not Found");
  }
});

const createQaTask = asyncHandler(async (req, res) => {
  const { job_number, total_volume, edited_volume, status } = req.body;
  const email = req.user.email;

  const task_received_date = new Date(
    req.body.task_received_date
  ).toLocaleDateString();
  const taskExists = await QaTracker.findOne({ job_number });

  if (taskExists) {
    res.status(400);
    throw new Error("Task Already Exists!");
  }

  const qaTaskTracker = await QaTracker.create({
    job_number,
    email,
    total_volume,
    edited_volume,
    task_received_date,
    status,
  });

  if (qaTaskTracker) {
    res.status(201).json({
      job_number: qaTaskTracker.job_number,
      email: qaTaskTracker.email,
      total_volume: qaTaskTracker.total_volume,
      edited_volume: qaTaskTracker.edited_volume,
      task_received_date: qaTaskTracker.task_received_date,
      status: qaTaskTracker.status,
    });
  } else {
    res.status(400);
    throw new Error("There is an Error!");
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await QaTracker.findById(req.params.id);

  if (req.user.isAdmin !== true) {
    res.status(401);
    throw new Error("You cannot perform this task");
  }

  if (task) {
    await task.remove();
    res.json({ message: "Task Removed" });
  } else {
    res.status(404);
    throw new Error("Task Not Found!");
  }
});

module.exports = {
  getQaTasks,
  getCsvFile,
  createQaTask,
  deleteTask,
  getAdminTasks,
  getTaskById,
  updateTask,
};
