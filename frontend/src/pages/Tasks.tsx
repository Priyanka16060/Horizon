import { useEffect, useState } from "react";
import {
  Plus,
  CheckSquare,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  getTasks,
  deleteTask,
  type Task,
} from "../services/taskService";

import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(task: Task) {
    setSelectedTask(task);
    setOpenEditModal(true);
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  }

  function statusColor(status: string) {
    switch (status) {
      case "Completed":
        return "bg-green-500/15 text-green-400 border border-green-500/20";

      case "In Progress":
        return "bg-amber-500/15 text-amber-400 border border-amber-500/20";

      default:
        return "bg-blue-500/15 text-blue-400 border border-blue-500/20";
    }
  }

  function priorityColor(priority: string) {
    switch (priority) {
      case "High":
        return "bg-red-500/15 text-red-400 border border-red-500/20";

      case "Medium":
        return "bg-orange-500/15 text-orange-400 border border-orange-500/20";

      default:
        return "bg-green-500/15 text-green-400 border border-green-500/20";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070d] text-white flex items-center justify-center text-xl relative">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#05070d] to-[#0a0616]" />
        </div>
        <span className="relative z-10">Loading tasks...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-white relative p-10">

      {/* Ambient background */}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#05070d] to-[#0a0616]" />
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">Tasks</h1>
            <p className="text-slate-400 mt-2">Manage your project tasks</p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            New Task
          </button>

        </div>

        {/* Empty State */}

        {tasks.length === 0 ? (
          <div className="mt-14 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center shadow-lg shadow-black/20">

            <CheckSquare size={70} className="mx-auto text-slate-600" />

            <h2 className="text-2xl font-bold mt-5">No tasks found</h2>

            <p className="text-slate-400 mt-3">
              Create your first task to start managing your work.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-white/[0.06] transition shadow-lg shadow-black/20"
              >

                <CheckSquare className="text-blue-400 mb-5" size={30} />

                <h2 className="text-xl font-semibold">{task.title}</h2>

                <p className="text-slate-400 mt-3 min-h-[60px] text-sm leading-relaxed">
                  {task.description || "No description provided."}
                </p>

                <div className="flex gap-2 mt-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(task.status)}`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </span>

                </div>

                <div className="flex justify-end gap-3 mt-7">

                  <button
                    onClick={() => handleEdit(task)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white/5 border border-white/10 hover:bg-amber-500/20 hover:border-amber-500/40 hover:text-amber-300 transition"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-500 transition"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

        <CreateTaskModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onCreated={loadTasks}
        />

        <EditTaskModal
          open={openEditModal}
          task={selectedTask}
          onClose={() => setOpenEditModal(false)}
          onUpdated={() => {
            loadTasks();
            setOpenEditModal(false);
          }}
        />

      </div>

    </div>
  );
}