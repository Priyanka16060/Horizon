import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getProjects,
  deleteProject,
  updateProject,
} from "../services/projectService";

import {
  getTasks,
  deleteTask,
} from "../services/taskService";

import type { Task } from "../services/taskService";

import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [createOpen, setCreateOpen] = useState(false);

  const [editTaskOpen, setEditTaskOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  useEffect(() => {
    loadProject();
    loadTasks();
  }, []);

  async function loadProject() {
    const projects = await getProjects();

    const p = projects.find(
      (x: any) => x.id === Number(id)
    );

    setProject(p);
  }

  async function loadTasks() {
    const data = await getTasks();

    setTasks(
      data.filter(
        (task) =>
          task.project_id === Number(id)
      )
    );
  }

  async function handleDeleteProject() {
    if (!project) return;

    if (
      !window.confirm(
        "Delete this project?"
      )
    )
      return;

    await deleteProject(project.id);

    navigate("/projects");
  }

  async function handleEditProject() {
    const name = prompt(
      "Project Name",
      project.name
    );

    if (!name) return;

    const description = prompt(
      "Description",
      project.description
    );

    if (description == null) return;

    await updateProject(project.id, {
      name,
      description,
    });

    loadProject();
  }

  async function handleDeleteTask(taskId: number) {
    if (
      !window.confirm(
        "Delete this task?"
      )
    )
      return;

    await deleteTask(taskId);

    loadTasks();
  }

  if (!project)
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <button
        onClick={() => navigate("/projects")}
        className="mb-6 text-blue-400"
      >
        ← Back
      </button>

      <div className="flex justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            {project.name}
          </h1>

          <p className="text-slate-400 mt-2">
            {project.description}
          </p>

        </div>

        <div className="space-x-3">

          <button
            onClick={handleEditProject}
            className="bg-yellow-500 px-4 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={handleDeleteProject}
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

      <div className="mt-12 flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Tasks
        </h2>

        <button
          onClick={() =>
            setCreateOpen(true)
          }
          className="bg-blue-600 px-5 py-2 rounded-lg"
        >
          + Add Task
        </button>

      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-700">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="p-4 text-left">
                Title
              </th>

              <th>Status</th>

              <th>Priority</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (

              <tr
                key={task.id}
                className="border-t border-slate-700"
              >

                <td className="p-4">
                  {task.title}
                </td>

                <td>{task.status}</td>

                <td>{task.priority}</td>

                <td>

                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setEditTaskOpen(true);
                    }}
                    className="bg-yellow-500 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteTask(
                        task.id
                      )
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <CreateTaskModal
        open={createOpen}
        onClose={() =>
          setCreateOpen(false)
        }
        onCreated={loadTasks}
      />

      <EditTaskModal
        open={editTaskOpen}
        task={selectedTask}
        onClose={() =>
          setEditTaskOpen(false)
        }
        onUpdated={loadTasks}
      />

    </div>
  );
}