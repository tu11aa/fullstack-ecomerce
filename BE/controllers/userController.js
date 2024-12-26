import authHelper from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import validator from "validator";

const PASSWORD_MINIMUM_LENGTH = 6;

const loginUser = async (req, res) => {};

const adminLogin = async (req, res) => {};

const registerUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

export { loginUser, registerUser, logoutUser, adminLogin };
