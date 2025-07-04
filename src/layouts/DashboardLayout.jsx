import { Outlet } from "react-router-dom";
import Sidebar     from "@components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {/* área desplazable */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
