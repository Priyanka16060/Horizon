import { useState } from "react";
import { createProject } from "../services/projectService";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateProjectModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  async function handleCreate() {
    try {
      setLoading(true);

      await createProject({
        name,
        description,
      });

      setName("");
      setDescription("");

      onCreated();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl w-[500px] p-8 border border-slate-700">

        <h2 className="text-2xl font-bold mb-6">
          Create Project
        </h2>

        <div className="space-y-5">

          <div>

            <label className="text-slate-300">
              Project Name
            </label>

            <input
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="text-slate-300">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e)=>
                setDescription(e.target.value)
              }
              className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
            />

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
            {loading ? "Creating..." : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
}