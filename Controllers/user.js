import { User } from "../Models/user.js";
import bcrypt from "bcrypt";
import { setCookies } from "../Utils/features.js";

export const getAllUsers = async (req, res) => {};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 404));

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  setCookies(user, res, "Registered Successfully");
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Credentials", 404));

  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch)
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  setCookies(user, res, `Welcome back ${user.name}`);
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};
