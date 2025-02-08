


import { useState, useEffect } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: { _id?:string,title: string; description: string; dueDate: string; completed: boolean }) => void;
  initialData?: { _id?:string,title: string; description: string; dueDate: string; completed: boolean };
}

export default function TaskModal({ isOpen, onClose, onSubmit, initialData }: TaskModalProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [completed, setCompleted] = useState(initialData?.completed || false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate);
      setCompleted(initialData.completed);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (initialData?._id) {
      // ✅ Editing existing task (requires _id)
      onSubmit({
        _id: initialData._id,
        title,
        description,
        dueDate,
        completed,
      });
    } else {
      // ✅ Creating a new task (no _id)
      onSubmit({
        title,
        description,
        dueDate,
        completed,
      });
    }
  
    onClose();
  };
  
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Task" : "Create Task"}</h2>
        
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <input
          type="date"
          className="w-full p-2 border rounded mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        
        {/* ✅ Checkbox for Marking Task as Completed */}
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <span>Mark as Completed</span>
        </label>

        <div className="flex justify-end space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            {initialData ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
