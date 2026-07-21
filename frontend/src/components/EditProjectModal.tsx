import { useEffect, useState } from "react";
import { updateProject } from "../services/projectService";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface Props {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditProjectModal({
  open,
  project,
  onClose,
  onUpdated,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  async function handleUpdate() {
    if (!project) return;

    if (!name.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      setLoading(true);

      await updateProject(project.id, {
        name,
        description,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    } finally {
      setLoading(false);
    }
  }

  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[500px] p-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Edit Project
        </h2>

        <div className="space-y-5">

          <div>

            <label className="text-slate-300">
              Project Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            {loading ? "Updating..." : "Update Project"}
          </button>

        </div>

      </div>

    </div>
  );
}