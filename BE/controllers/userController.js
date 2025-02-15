import dotenv from "dotenv";
import authHelper from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import validator from "validator";

dotenv.config();

const PASSWORD_MINIMUM_LENGTH = 6;

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
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

    if (!(await authHelper.comparePassword(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = authHelper.generateToken(user._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        cartData: user.cartData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (!authHelper.comparePassword(password, admin.password)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = authHelper.generateToken(admin._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
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

    const hashedPassword = await authHelper.hashPassword(password);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("Created user \n", user);

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.cookie("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export { getMe, loginUser, registerUser, logoutUser, adminLogin };
