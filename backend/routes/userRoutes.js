const express = require("express");
const {
  registerUser,
  authUser,
  authAdminUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/adminlogin").post(authAdminUser);

module.exports = router;
