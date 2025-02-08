

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  createdAt?: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
  isPending: boolean;
}

export default function TaskCard({
  title,
  description,
  dueDate,
  createdAt = "Just now",
  completed,
  onEdit,
  onDelete,
  isPending,
}: TaskCardProps) {
  const formattedDueDate = dueDate ? dueDate.toString() : "No Due Date";

  return (
    <div className="bg-white border border-gray-300 shadow-md rounded-lg p-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
      <div className="flex flex-wrap justify-between items-center text-gray-500 text-sm mb-2 gap-2">
        <span className="truncate">{createdAt}</span>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-purple-500 p-2 hover:bg-purple-100 rounded-full hover:text-purple-700 transition">
            <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-2 transition">
            <TrashIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold break-words">{title}</h3>
      <p className="text-gray-600 mt-1 break-words">{description}</p>

      <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
        <p className="text-sm text-gray-500">Due: {formattedDueDate}</p>
        <div className={`text-sm p-1.5 font-semibold text-white rounded-full ${completed ? "bg-green-500" : "bg-red-500"}`}>
          {completed ? "Completed" : "Pending"}
        </div>
      </div>
    </div>
  );
}
