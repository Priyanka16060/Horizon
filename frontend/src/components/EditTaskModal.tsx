import { useEffect, useState } from "react";
import { updateTask } from "../services/taskService";
import type { Task } from "../services/taskService";

interface Props {
  open: boolean;
  task: Task |null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditTaskModal({
  open,
  task,
  onClose,
  onUpdated,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Medium");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  async function handleUpdate() {
    if (!task) return;

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      setLoading(true);

      await updateTask(task.id, {
        title,
        description,
        status,
        priority,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  }

  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[550px] p-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Edit Task
        </h2>

        <div className="space-y-5">

          <div>
            <label className="text-slate-300">
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>

        </div>

      </div>

    </div>
  );
}