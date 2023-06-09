import ErrorHandler from "../Middleware/error.js";
import { Task } from "../Models/tasks.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user });
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await Task.find({ user: userId });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(201).json({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    await task.deleteOne();
    res.status(201).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
