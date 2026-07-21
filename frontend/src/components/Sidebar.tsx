import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      path: "/projects",
    },
    {
      name: "Tasks",
      icon: CheckSquare,
      path: "/tasks",
    },
  ];

  return (
    <aside className="w-72 h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

      <div className="h-20 flex items-center px-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-blue-500">
          Horizon
        </h1>

      </div>

      <nav className="flex-1 px-5 py-8">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-5 py-4 mb-2 transition ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

      </nav>

      <div className="p-5 border-t border-slate-800">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 py-3"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}