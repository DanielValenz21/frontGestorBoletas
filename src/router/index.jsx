import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login          from "@screens/Login/Login";
import Dashboard      from "@screens/Dashboard/Dashboard";
import DashboardLayout from "@layouts/DashboardLayout";
import NuevaBoleta    from "@screens/NuevaBoleta/NuevaBoleta";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "nueva-boleta", element: <NuevaBoleta /> },
      { path: "boletas/*",     element: <div /> },
      { path: "reportes",      element: <div /> },
      { path: "admin/*",       element: <div /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
