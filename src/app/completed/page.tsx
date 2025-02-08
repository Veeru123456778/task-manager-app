"use client";

import { useState, useEffect } from "react";
import TaskCard from "@/components/taskcard";
import { getCompletedTasks } from "../tasks/actions";

export default function CompletedTasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getCompletedTasks();
      setTasks(response);
    };
    fetchTasks();
  }, []);

  return (
    <main className="w-full p-5">
      <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
      <div className="grid grid-cols-3 gap-3">
        {tasks.map(task => (
          <TaskCard key={task._id} {...task} />
        ))}
      </div>
    </main>
  );
}
