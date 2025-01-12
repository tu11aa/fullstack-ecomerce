import dotenv from "dotenv";
import authHelper from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

dotenv.config();

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const userId = authHelper.decodeToken(token);
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminProtect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const credential = authHelper.decodeToken(token);
    if (!credential) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (credential !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { protect, adminProtect };
