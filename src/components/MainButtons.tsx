

"use client";

import { useState } from "react";
import TaskModal from "@/components/TaskModal";
import { addNewTask } from "@/Utils/taskUtils";

export default function MainButtons({ setTasks, tasks }: { setTasks: any; tasks: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = async (task: { title: string; description: string; dueDate: string }) => {
    const formattedTask = { ...task, dueDate: task.dueDate.toString() };
    await addNewTask(formattedTask, setTasks);
    setIsModalOpen(false);
  };

  const handleSort = (sortType: string) => {
    let sortedTasks = [...tasks];

    if (sortType === "due-date") {
      sortedTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (sortType === "created") {
      sortedTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    setTasks(sortedTasks);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 bg-white p-4 rounded-lg shadow-md mb-6 w-1/2 max-w-3xl mx-auto">
      <button
        className="font-semibold text-purple-800 bg-purple-200 px-6 py-3 rounded-md hover:border transition w-full sm:w-auto"
        onClick={() => setIsModalOpen(true)}
      >
        + Create Task
      </button>

      <div className="w-full sm:w-auto">
        <select
          className="bg-gray-200 text-gray-700 px-4 font-semibold py-3 rounded-md hover:bg-gray-300 transition w-full sm:w-auto"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="all">Sort</option>
          <option value="due-date">Due Date</option>
          <option value="created">Created</option>
        </select>
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTask} />
    </div>
  );
}
