import React, { useEffect, useState } from "react";
import {
  FolderKanban,
  CheckCircle2,
  ClipboardList,
  Search,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import { getDashboard } from "../services/dashboardService";
import DashboardCharts from "../components/DashboardCharts";
import { getCurrentUser } from "../services/authService";
import { getNotifications } from "../services/notificationService";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [dashboard, setDashboard] = useState<{
    total_projects?: number;
    total_tasks?: number;
    completed_tasks?: number;
    in_progress_tasks?: number;
    todo_tasks?: number;
    completion_rate?: number;
    recent_projects?: Array<{
      id: number;
      name: string;
    }>;
  } | null>(null);
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
    getCurrentUser().then(setUser);
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const filteredProjects =
    dashboard?.recent_projects?.filter((project: any) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalTasks = dashboard?.total_tasks ?? 0;
  const completedTasks = dashboard?.completed_tasks ?? 0;

  return (
    <div className="min-h-screen flex bg-[#05070d] text-white relative">

      {/* Ambient background */}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#05070d] to-[#0a0616]" />
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Sidebar */}

      <aside className="relative w-72 bg-white/[0.03] backdrop-blur-xl border-r border-white/10 flex flex-col z-10">

        <div className="p-8 border-b border-white/10">
          <h1 className="text-3xl font-bold text-blue-400">Horizon</h1>
        </div>

        <nav className="flex-1 p-6 space-y-2">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium shadow-lg shadow-blue-600/20"
          >
            <FolderKanban size={20} />
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition"
          >
            <ClipboardList size={20} />
            Projects
          </Link>

          <Link
            to="/tasks"
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition"
          >
            <CheckCircle2 size={20} />
            Tasks
          </Link>

        </nav>

      </aside>

      {/* Main */}

      <main className="relative flex-1 flex flex-col z-10 min-w-0">

        <header className="relative z-30 h-20 border-b border-white/10 bg-[#0a0e1a]/80 backdrop-blur-xl flex items-center justify-between px-8 lg:px-12">

          <div className="relative w-full max-w-sm">

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.07] transition"
          />

          <Search
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10"
          />

        </div>

          <div className="flex items-center gap-3">

            <div className="relative">

              <button
                onClick={() => {
                  setShowNotifications((prev) => {
                    const next = !prev;
                    if (next) loadNotifications();
                    return next;
                  });
                }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
              >
                <Bell size={17} className="text-slate-300" />
              </button>

              {showNotifications && (

                <div className="absolute right-0 top-full mt-3 w-80 max-h-96 overflow-y-auto rounded-xl bg-[#0d1220] backdrop-blur-xl border border-white/10 shadow-2xl z-[100]">

                  <div className="p-4 border-b border-white/10 font-semibold text-sm sticky top-0 bg-[#0d1220] rounded-t-xl">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (
                    <div className="p-4 text-sm text-slate-500">
                      No new notifications.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition"
                      >
                        <p className="text-sm leading-snug break-words">{n.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                      </div>
                    ))
                  )}

                </div>

              )}

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-red-500/40 hover:text-red-400 text-slate-300 px-4 py-2.5 rounded-xl text-sm transition"
            >
              <LogOut size={15} />
              Logout
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10 ml-1">

              <UserCircle size={32} className="text-slate-400" />

              <div className="leading-tight hidden sm:block">
                <h3 className="font-medium text-sm">
                  {user?.username || "User"}
                </h3>
                <p className="text-slate-500 text-xs">{user?.email}</p>
              </div>

            </div>

          </div>

        </header>

        <div className="flex-1 w-full p-8 lg:p-12">

          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back 👋
          </h2>

          <p className="text-slate-400 mt-2 mb-8">
            Manage your projects from one place.
          </p>

          {/* Stat cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 pb-7 min-h-[180px] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06] transition shadow-lg shadow-black/20 flex flex-col justify-between">
              <FolderKanban className="text-blue-400" size={26} />
              <div className="mt-4">
                <h1 className="text-3xl font-bold leading-tight">
                  {dashboard?.total_projects ?? 0}
                </h1>
                <p className="text-slate-400 text-sm mt-1.5">Total Projects</p>
                <p className="text-green-400 text-xs mt-2">Active Projects</p>
              </div>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 pb-7 min-h-[180px] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.06] transition shadow-lg shadow-black/20 flex flex-col justify-between">
              <ClipboardList className="text-amber-400" size={26} />
              <div className="mt-4">
                <h1 className="text-3xl font-bold leading-tight">{totalTasks}</h1>
                <p className="text-slate-400 text-sm mt-1.5">Total Tasks</p>
                <p className="text-amber-400 text-xs mt-2">Pending Work</p>
              </div>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 pb-7 min-h-[180px] border border-white/10 hover:border-green-500/40 hover:bg-white/[0.06] transition shadow-lg shadow-black/20 flex flex-col justify-between">
              <CheckCircle2 className="text-green-400" size={26} />
              <div className="mt-4">
                <h1 className="text-3xl font-bold leading-tight text-green-400">
                  {completedTasks}
                </h1>
                <p className="text-slate-400 text-sm mt-1.5">Completed</p>
                <p className="text-green-400 text-xs mt-2">Finished Tasks</p>
              </div>
            </div>

          </div>

          {/* Productivity + charts */}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">

            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg shadow-black/20 flex flex-col">

              <h3 className="text-base font-semibold mb-4">Productivity</h3>

              <div className="w-full bg-white/10 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all"
                  style={{
                    width: `${
                      totalTasks ? (completedTasks / totalTasks) * 100 : 0
                    }%`,
                  }}
                />
              </div>

              <p className="mt-4 text-slate-400 text-sm">
                {totalTasks
                  ? Math.round((completedTasks / totalTasks) * 100)
                  : 0}
                % completed
              </p>

            </div>

            <div className="lg:col-span-3 bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg shadow-black/20">
              <DashboardCharts
                totalProjects={dashboard?.total_projects ?? 0}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                inProgressTasks={dashboard?.in_progress_tasks ?? 0}
                todoTasks={dashboard?.todo_tasks ?? 0}
                completionRate={dashboard?.completion_rate ?? 0}
              />
            </div>

          </div>

          {/* Recent projects */}

          <div className="mt-10">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold">Recent Projects</h2>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-600/20"
              >
                + New Project
              </button>

            </div>

            <div className="bg-white/[0.04] backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-lg shadow-black/20">

              <table className="w-full text-sm">

                <thead className="bg-white/[0.03]">
                  <tr className="text-left text-slate-400">
                    <th className="px-6 py-4 font-medium">Project</th>
                    <th className="px-6 py-4 font-medium">Team</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Progress</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center p-8 text-slate-500">
                        No matching projects found.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((project: any) => (
                      <tr
                        key={project.id}
                        className="border-t border-white/5 hover:bg-white/[0.03] transition"
                      >
                        <td className="px-6 py-5">
                          <p className="font-medium">{project.name}</p>
                          <p className="text-slate-500 text-xs mt-0.5">
                            {project.description}
                          </p>
                        </td>
                        <td className="px-6 text-slate-300">You</td>
                        <td className="px-6">
                          <span className="px-3 py-1 rounded-full text-xs bg-green-500/15 text-green-400">
                            Active
                          </span>
                        </td>
                        <td className="px-6">
                          <div className="w-40 bg-white/10 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full w-full" />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

      <CreateProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={() => {
          console.log("Project Created");
        }}
      />

    </div>
  );
}