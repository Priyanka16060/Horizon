import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}