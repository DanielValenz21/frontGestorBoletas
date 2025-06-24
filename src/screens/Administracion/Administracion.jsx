import { NavLink, Route, Routes, Navigate, useLocation } from "react-router-dom";
import DashboardTab     from "./tabs/DashboardTab";
import UsuariosTab      from "./tabs/UsuariosTab";
import ReportesTab      from "./tabs/ReportesTab";
import ConfiguracionTab from "./tabs/ConfiguracionTab";

const tabs = [
  { slug: "",            label: "Dashboard"    },
  { slug: "usuarios",    label: "Usuarios"     },
  { slug: "reportes",    label: "Reportes"     },
  { slug: "config",      label: "Configuración" },
];

export default function Administracion() {
  const { pathname } = useLocation();
  const base = "/dashboard/admin";

  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Administración</h1>
        <p className="text-gray-600">
          Gestión de usuarios, roles y configuración del sistema
        </p>
      </header>

      {/* barra de pestañas ------------------------------------------------ */}
      <nav className="mb-8">
        <ul className="grid grid-cols-4 rounded-md overflow-hidden border">
          {tabs.map(({ slug, label }) => {
            const to   = slug ? `${base}/${slug}` : base;
            const act  = pathname === to;
            return (
              <li key={slug} className="contents">
                <NavLink
                  to={to}
                  end
                  className={`text-center py-3 text-sm font-medium transition-colors
                     ${act ? "bg-white border-b-2 border-primary-600" : "bg-gray-100 text-gray-600 hover:text-gray-800"}`}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* contenido de cada pestaña ---------------------------------------- */}
      <Routes>
        <Route index           element={<DashboardTab   />} />
        <Route path="usuarios" element={<UsuariosTab    />} />
        <Route path="reportes" element={<ReportesTab    />} />
        <Route path="config"   element={<ConfiguracionTab />} />
        {/* fallback → Dashboard */}
        <Route path="*" element={<Navigate to={base} replace />} />
      </Routes>
    </>
  );
}
