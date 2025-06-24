import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  FileText,
  BarChart3,
  Settings,
  Shield,
  Users,
  LogOut,
} from "lucide-react";
import Button from "@components/ui/Button";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  {
    to: "/dashboard/nueva-boleta",
    label: "Nueva Boleta",
    icon: Plus,
  },
  { to: "/dashboard/boletas", label: "Boletas", icon: FileText },
  { to: "/dashboard/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/dashboard/admin", label: "Administración", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-full bg-white border-r flex flex-col">
      {/* logo */}
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="p-2 rounded-lg bg-primary-100">
          <Shield className="w-5 h-5 text-primary-600" />
        </span>
        <div>
          <p className="text-lg font-extrabold leading-none">Gestor</p>
          <p className="text-sm text-gray-500 -mt-1">Boletas</p>
        </div>
      </div>

      {/* navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
               ${
                 isActive
                   ? "bg-primary-100 text-primary-800"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* user */}
      <div className="px-4 py-5 border-t">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gray-100 rounded-full">
            <Users className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Administrador</p>
            <p className="text-gray-500">admin</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
}
