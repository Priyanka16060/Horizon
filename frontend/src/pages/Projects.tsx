import { useEffect, useState } from "react";
import {
  Plus,
  FolderKanban,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";

import {
  getProjects,
  deleteProject,
} from "../services/projectService";

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) => {
    const query = search.toLowerCase();

    return (
      project.name.toLowerCase().includes(query) ||
      (project.description ?? "").toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    const ok = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!ok) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  }

  function handleEdit(project: Project) {
    setSelectedProject(project);
    setEditOpen(true);
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

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">Projects</h1>
            <p className="text-slate-400 mt-2">Manage all your projects</p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            New Project
          </button>

        </div>

        {/* Stats */}

        <div className="mt-10 flex items-center justify-between flex-wrap gap-4">

          <p className="text-slate-400 text-sm">
            <span className="text-white font-semibold">{projects.length}</span>{" "}
            {projects.length === 1 ? "project" : "projects"} total
          </p>

          <div className="relative w-full max-w-sm">

            <input
              placeholder="Search project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-5 pr-12 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.07] transition"
            />

            <Search
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />

          </div>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

          {filteredProjects.length === 0 ? (

            <p className="text-slate-400">No projects found.</p>

          ) : (

            filteredProjects.map((project) => (

              <div
                key={project.id}
                className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-white/[0.06] transition shadow-lg shadow-black/20"
              >

                <FolderKanban size={30} className="text-blue-400 mb-5" />

                <h2 className="text-xl font-semibold">
                  <Link
                    to={`/projects/${project.id}`}
                    className="hover:text-blue-400 transition"
                  >
                    {project.name}
                  </Link>
                </h2>

                <p className="text-slate-400 mt-3 min-h-[60px] text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 rounded-lg py-2 text-sm transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-500 rounded-lg py-2 text-sm transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        <CreateProjectModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onCreated={() => {
            loadProjects();
            setOpenModal(false);
          }}
        />

        <EditProjectModal
          open={editOpen}
          project={selectedProject}
          onClose={() => setEditOpen(false)}
          onUpdated={() => {
            loadProjects();
            setEditOpen(false);
          }}
        />

      </div>

    </div>
  );
}