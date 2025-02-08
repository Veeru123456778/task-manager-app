"use client";

import { useState, useEffect } from "react";
import TaskCard from "@/components/taskcard";
import { getPendingTasks } from "../tasks/actions";

export default function PendingTasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getPendingTasks();
      setTasks(response);
      console.log(response);
    };
    fetchTasks();
  }, []);

  return (
    <main className="w-full p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Tasks</h2>
      <div className="grid grid-cols-3 gap-3">
        {tasks.map(task => (
          <TaskCard key={task._id} {...task} />
        ))}
      </div>
    </main>
  );
}
