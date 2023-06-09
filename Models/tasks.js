import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true
  }
});

export const Task = mongoose.model("Tasks", taskSchema);
