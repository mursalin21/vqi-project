const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("There is an Error!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isAdmin) != true) {
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password!");
    }
  } else {
    res.status(400);
    throw new Error("This is an Admin Account! Agent Access Only");
  }
});

const authAdminUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isAdmin) === true) {
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password!");
    }
  } else {
    res.status(400);
    throw new Error("Admin Access Only!");
  }
});

module.exports = { registerUser, authUser, authAdminUser };
