import { createTask } from "@/app/tasks/actions";

interface TaskData {
  title: string;
  description: string;
  dueDate: string;
}

export const addNewTask = async (newTask: TaskData, setTasks: (tasks: any) => void) => {
  try {
    const response = await createTask(newTask);
    setTasks((prevTasks: any) => [...prevTasks, response]); 
  } catch (error) {
    console.error("Error adding new task:", error);
    throw error;
  }
};
