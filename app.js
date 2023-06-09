import express from "express";
import userRouter from "./routes/user.js"
import local from "dotenv"
import cookieParser from "cookie-parser";
import taskrouters from "./routes/tasks.js"
import { errorMiddleware } from "./Middleware/error.js";
import cors from "cors"

export const app = express();

local.config({
  path:"./data/.env.local"
})

//using middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors(
  {
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
  }

))

app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskrouters);

app.get("/", (req, res) => {
  res.send("Good Working");
});


app.use(errorMiddleware)