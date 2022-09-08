import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { errorHandler, userValidation } from "../middleware/validations.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const createNewUser = async (req, res) => {
  errorHandler(req, res);
  try {
    const isAlready = await User.findOne({ email: req.body.email });
    if (isAlready) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const user = await User.create(req.body);
    return res.json({
      _id: user._id,
      email: user.email,
      isAdmin: false,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Failed to Create User",
    });
  }
};

const login = async (req, res) => {
  errorHandler(req, res);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: "Invalid Email or Password",
      });
    }
    const isPasswordValid = await user.matchPassword(req.body.password || "0");
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid Email or Password",
      });
    }
    return res.json({
      _id: user._id,
      email: user.email,
      isAdmin: false,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(400).json({
      error: "Failed to Login",
    });
  }
};

const adminLogin = async (req, res) => {
  errorHandler(req, res);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    if (!user.isAdmin) {
      return res.status(400).json({
        error: "User is not an admin",
      });
    }
    const isPasswordValid = await user.matchPassword(req.body.password || "0");
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid Email or Password",
      });
    }
    return res.json({
      _id: user._id,
      email: user.email,
      isAdmin: true,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(400).json({
      error: "Failed to Login",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Failed to get User",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (error) {
    return res.status(400).json({
      error: "Failed to get Users",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.json({
      message: "Link sent to your email",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Failed to Reset Password",
    });
  }
};

// ROUTES
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/create").post(userValidation, createNewUser);
router.route("/login").post(userValidation, login);
router.route("/adminLogin").post(userValidation, adminLogin);
router.route("/reset").post(resetPassword);
router.route("/:id").get(getUserById);
export default router;
