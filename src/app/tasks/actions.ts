
"use server";

import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";

interface TaskData {
  title: string;
  description: string;
  dueDate: string;
  completed:boolean;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}



export const getCompletedTasks = async () => {
  await connectDB();
  const data = await Task.find({ completed: true }).lean();

  const formattedData = data.map(task => ({
    ...task,
    _id: task._id.toString(), // ✅ Convert ObjectId to string
    createdAt: new Date(task.createdAt).toISOString(), // ✅ Convert Date to string
    updatedAt: new Date(task.updatedAt).toISOString(), // ✅ Convert Date to string
  }));

  console.log(formattedData); // Debugging log
  return formattedData;
};

export const getPendingTasks = async () => {
  await connectDB();
  const data = await Task.find({ completed: false }).lean();

  const formattedData = data.map(task => ({
    ...task,
    _id: task._id.toString(), // ✅ Convert ObjectId to string
    createdAt: new Date(task.createdAt).toISOString(), // ✅ Convert Date to string
    updatedAt: new Date(task.updatedAt).toISOString(), // ✅ Convert Date to string
  }));

  console.log(formattedData); // Debugging log
  return formattedData;
};


// ✅ Create Task
export const createTask = async (data: TaskData) => {
  await connectDB();

  if (!data.title || !data.description || !data.dueDate) {
    throw new Error("All fields (title, description, dueDate) are required.");
  }

  try {
    const task = await Task.create({ ...data, dueDate: data.dueDate.toString() ,createdAt: new Date().toString(),});
    revalidatePath("/tasks");
    return { ...task.toObject(), _id: task._id.toString()};
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task.");
  }
};

// ✅ Get Tasks
export const getTasks = async () => {
  await connectDB();

  try {
    const tasks = await Task.find({}, "title description dueDate createdAt completed").lean();
    return tasks.map(task => ({
      ...task,
      _id: task._id.toString(),
      dueDate: task.dueDate ? task.dueDate.toString() : null, 
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks.");
  }
};


export const updateTask = async (
  id: string,
  data: { title: string; description: string; dueDate: string; completed: boolean }
) => {
  try {
    await connectDB();

    console.log("Updating Task with ID:", id, "Data:", data); // Debugging Log

    const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true }).lean();

    if (!updatedTask) {
      console.error("Task not found or update failed.");
      throw new Error("Task not found or update failed.");
    }

    console.log("Updated Task:", updatedTask); // Debugging Log

    revalidatePath("/"); // ✅ Ensures UI updates instantly
    return { ...updatedTask, _id: updatedTask._id.toString() };
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task.");
  }
};


// ✅ Delete Task
export const deleteTask = async (id: string) => {
  await connectDB();

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) throw new Error("Task not found.");

    revalidatePath("/tasks");
    return { message: "Task deleted successfully." };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task.");
  }
};
