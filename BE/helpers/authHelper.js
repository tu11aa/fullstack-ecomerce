import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const authHelper = {};

authHelper.generateToken = (id, exp = "7d") => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: exp,
  });
};

authHelper.decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

authHelper.hashPassword = async (password, length = 10) => {
  const salt = await bcrypt.genSalt(length);
  return await bcrypt.hash(password, salt);
};

authHelper.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export default authHelper;
