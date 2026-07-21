import { useEffect, useState } from "react";
import { createTask } from "../services/taskService";
import { getProjects } from "../services/projectService";

interface Project {
  id: number;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateTaskModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Medium");
  const [projectId, setProjectId] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadProjects();
    }
  }, [open]);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);

      if (data.length > 0) {
        setProjectId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreate() {
    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    if (projectId === 0) {
      alert("Please create a project first.");
      return;
    }

    try {
      setLoading(true);

      await createTask({
        title,
        description,
        status,
        priority,
        project_id: projectId,
      });

      setTitle("");
      setDescription("");
      setStatus("Todo");
      setPriority("Medium");

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[550px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Create Task
        </h2>

        <div className="space-y-5">

          {/* Title */}

          <div>

            <label className="text-slate-300">
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* Description */}

          <div>

            <label className="text-slate-300">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* Project */}

          <div>

            <label className="text-slate-300">
              Project
            </label>

            <select
              value={projectId}
              onChange={(e) => setProjectId(Number(e.target.value))}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
            >
              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}
            </select>

          </div>

          {/* Status */}

          <div>

            <label className="text-slate-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          {/* Priority */}

          <div>

            <label className="text-slate-300">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>

        </div>

      </div>

    </div>
  );
}