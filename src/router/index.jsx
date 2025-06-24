import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login          from "@screens/Login/Login";
import Dashboard      from "@screens/Dashboard/Dashboard";
import DashboardLayout from "@layouts/DashboardLayout";
import NuevaBoleta    from "@screens/NuevaBoleta/NuevaBoleta";
import Boletas        from "@screens/Boletas/Boletas";
import DetalleBoleta  from "@screens/Boletas/DetalleBoleta";
import Reportes       from "@screens/Reportes/Reportes";
import Administracion from "@screens/Administracion/Administracion";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "nueva-boleta", element: <NuevaBoleta /> },
      { path: "boletas",       element: <Boletas /> },
      { path: "boletas/:id",   element: <DetalleBoleta /> },
      { path: "reportes",      element: <Reportes /> },
      { path: "admin/*",       element: <Administracion /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
