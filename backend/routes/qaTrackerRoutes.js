const express = require("express");
const {
  createQaTask,
  getQaTasks,
  deleteTask,
  getAdminTasks,
  getTaskById,
  updateTask,
  getCsvFile,
} = require("../controllers/qaTrackerControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getQaTasks);
router.route("/qaAdminTasks").get(getAdminTasks);
router.route("/getCsvFile").get(getCsvFile);
router.route("/qaTaskCreate").post(protect, createQaTask);
router.route("/:id").get(getTaskById).put(updateTask);
router.route("/:id").delete(protect, deleteTask);

module.exports = router;
