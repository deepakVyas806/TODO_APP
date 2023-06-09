import express from "express"
import { createTask, deleteTask, getMyTasks, updateTask } from "../Controllers/tasks.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();

//creating new task
router.post("/new",isAuthenticated,createTask)

//Get All Tasks
router.get("/all",isAuthenticated,getMyTasks)

//Update and Delete Tasks
router.route("/:id").put(updateTask).delete(deleteTask)

export default router;