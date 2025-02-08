

"use client";

import { useState, useEffect } from "react";
import TaskCard from "@/components/taskcard";
import MainButtons from "@/components/MainButtons";
import TaskModal from "@/components/TaskModal";
import { useSearchParams } from "next/navigation";
import { getTasks, updateTask, deleteTask as deleteTaskAction } from "./tasks/actions";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTaskAction(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const openEditModal = (task: Task) => {
    if (!task || !task._id) {
      console.error("Error: Task data is missing!", task);
      return;
    }
    setEditingTask(task); // ✅ Correct way to set task for editing
  };
  

const handleEditTask = async (updatedData: Task) => {
  if (!updatedData._id) {
    console.error("Error: Task ID is missing!");
    return;
  }

  const updatedTask = await updateTask(updatedData._id, updatedData); 

  if (updatedTask) {
    setTasks((prevTasks) => 
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  }
};


  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;

  return (
    <main className="w-full">
      <MainButtons setTasks={setTasks} tasks={tasks} />
      <div className="bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate ? task.dueDate.toString() : "No Due Date"}
              createdAt={task.createdAt}
              completed={task.completed}
              onEdit={() => openEditModal(task)} // ✅ Opens edit modal
              onDelete={() => handleDeleteTask(task._id)}
              isPending={!task.completed}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No tasks yet. Start by adding one!</p>
        )}
      </div>

      {editingTask && (
        <TaskModal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleEditTask}
          initialData={editingTask} // ✅ Includes "Mark as Completed" checkbox
        />
      )}
    </main>
  );
}
