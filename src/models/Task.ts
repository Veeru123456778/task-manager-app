

import mongoose, { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description:{type:String,required:true},
  dueDate:{type:String,required:true},
  completed: { type: Boolean, default: false },
  createdAt: { type: String, default: () => new Date().toString() }, // ✅ Default as a string
},
{timestamps:true}
);

const Task = models?.Task || model("Task", taskSchema);

export default Task;
