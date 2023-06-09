import { User } from "../Models/user.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req,res,next)=>{
    const { token } = req.cookies;
    if (!token)
      return res.status(400).json({
        success: false,
        message: "Login First",
      });
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decodedData._id);
    next();  
}