import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-end px-8">

      <div className="flex items-center gap-6">

        <Bell
          className="text-slate-400 hover:text-white cursor-pointer"
          size={22}
        />

        <div className="flex items-center gap-3">

          <UserCircle size={40} />

          <div>
            <h2 className="font-semibold">
              Priyanka
            </h2>

            <p className="text-slate-400 text-sm">
              Backend Engineer
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}