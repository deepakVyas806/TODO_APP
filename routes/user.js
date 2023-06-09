import express from "express";
import { User } from "../Models/user.js";
import {
  getAllUsers,
  registerUser,
  loginUser,
  getMyProfile,
  logoutUser,
} from "../Controllers/user.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();

//Fetching all Users
router.get("/all", getAllUsers);

//creating a new User
router.post("/new", registerUser);

//Logging In User
router.post("/login", loginUser);

//LogOut User
router.get("/logout", logoutUser);

//Getting User Details , Upadating User , deleting User using chaining / Same Route
router.get("/me",isAuthenticated,getMyProfile)


export default router;
