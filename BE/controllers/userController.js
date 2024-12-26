import authHelper from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const PASSWORD_MINIMUM_LENGTH = 6;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (!authHelper.comparePassword(password, user.password)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = authHelper.generateToken(user._id);

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = authHelper.generateToken(email, "1w");
      res
        .status(200)
        .json({ success: true, message: "Admin login successful", token });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }
    if (password.length < PASSWORD_MINIMUM_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters`,
      });
    }

    const hashedPassword = authHelper.hashPassword(password);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = authHelper.generateToken(user._id);

    res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const logoutUser = async (req, res) => {
  // try {
  //   const { token } = req.cookies;
  //   if (!token) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "No token provided" });
  //   }
  //   const userId = authHelper.decodeToken(token);
  //   await userModel.findByIdAndDelete(userId);
  //   res.status(200).json({ success: true, message: "User logged out" });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ success: false, message: error.message });
  // }
};

export { loginUser, registerUser, logoutUser, adminLogin };
