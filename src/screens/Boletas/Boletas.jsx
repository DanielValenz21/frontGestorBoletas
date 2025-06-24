import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Download,
} from "lucide-react";

import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@components/ui/Card";

/* ───────────  MOCK DATA  ─────────── */
function loadBoletas() {
  const stored = localStorage.getItem("boletas");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Si el array está vacío, usar mock
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      // Si hay error al parsear, usar mock
    }
  }

  /* datos de ejemplo si aún no hay nada guardado o el array está vacío */
  const mock = [
    {
      numero: "BOL-PRUEBA-001",
      placa: "TEST-123",
      fecha: "2025-06-24",
      lugar: "Zona 1, Ciudad de Guatemala",
      agente: "Agente Demo",
      total: 150.0,
      estado: "Pendiente",
      // campos para DetalleBoleta
      tipoVehiculo: "Automóvil",
      marca: "Toyota",
      color: "Rojo",
      tarjeta: "123456789",
      nit: "1234567-8",
      conductorAusente: false,
      genero: "Masculino",
      numeroDocumento: "1234567890101",
      tipoLicencia: "C",
      numeroLicencia: "A1234567",
      direccion: "Avenida Central 10-10, Zona 1",
      fechaCreacion: new Date().toISOString(),
      hora: "10:30",
      articulos: [
        { articulo: "152", monto: 100, baseLegal: "Ley Art. 152" },
        { articulo: "200", monto: 50, baseLegal: "Ley Art. 200" },
      ],
      subtotal: 150,
      porcentajeDescuento: 0,
      observaciones: "Ninguna",
    },
    {
      numero: "BOL-175063096077",
      placa: "435345",
      fecha: "2025-06-21",
      lugar: "San Antonio Suchitepequez",
      agente: "Luis",
      total: 108.24,
      estado: "Pendiente",
    },
    {
      numero: "BOL-1750732025891",
      placa: "ABC-123",
      fecha: "2025-06-23",
      lugar: "Ciudad de Guatemala",
      agente: "Ana",
      total: 0,
      estado: "Pendiente",
    },
    {
      numero: "BOL-1750732553214",
      placa: "XYZ-789",
      fecha: "2025-06-23",
      lugar: "Mixco",
      agente: "Carlos",
      total: 0,
      estado: "Pendiente",
    },
    {
      numero: "BOL-1750734751510",
      placa: "GT-1122",
      fecha: "2025-06-23",
      lugar: "Antigua Guatemala",
      agente: "María",
      total: 0,
      estado: "Pendiente",
    },
  ];
  localStorage.setItem("boletas", JSON.stringify(mock));
  return mock;
}

export default function Boletas() {
  /* ---------- estado ------------ */
  const [boletas, setBoletas] = useState([]);
  const [q, setQ] = useState("");
  const [estadoSel, setEstadoSel] = useState("todos");

  /* ---------- cargar ------------ */
  useEffect(() => setBoletas(loadBoletas()), []);

  /* ---------- filtrar / KPIs ---- */
  const filtradas = useMemo(() => {
    let list = [...boletas];
    if (q)
      list = list.filter(
        (b) =>
          b.numero.toLowerCase().includes(q.toLowerCase()) ||
          b.placa.toLowerCase().includes(q.toLowerCase()) ||
          b.lugar.toLowerCase().includes(q.toLowerCase()) ||
          b.agente.toLowerCase().includes(q.toLowerCase())
      );
    if (estadoSel !== "todos") list = list.filter((b) => b.estado === estadoSel);
    return list;
  }, [boletas, q, estadoSel]);

  const kpi = useMemo(() => {
    const total = filtradas.length;
    const pendientes = filtradas.filter((b) => b.estado === "Pendiente").length;
    const pagadas = filtradas.filter((b) => b.estado === "Pagada").length;
    const vencidas = filtradas.filter((b) => b.estado === "Vencida").length;
    return { total, pendientes, pagadas, vencidas };
  }, [filtradas]);

  /* ---------- helpers visuales -- */
  const badge = (estado) =>
    ({
      Pendiente: "bg-amber-100 text-amber-800",
      Pagada: "bg-green-100 text-green-800",
      Vencida: "bg-red-100 text-red-800",
    }[estado]);

  /* ---------- UI ---------------- */
  return (
    <div>
      {/* encabezado */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Boletas</h1>
          <p className="text-gray-600">Gestión y seguimiento de boletas de tránsito</p>
        </div>

        <Link to="/dashboard/nueva-boleta">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Boleta
          </Button>
        </Link>
      </header>

      {/* Botón para limpiar boletas y recargar datos de ejemplo (solo desarrollo) */}
      <div className="mb-4">
        <Button
          variant="destructive"
          onClick={() => {
            localStorage.removeItem("boletas");
            window.location.reload();
          }}
        >
          Limpiar boletas y cargar datos de ejemplo
        </Button>
      </div>

      {/* filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por número, placa, lugar o agente..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={estadoSel}
            onChange={setEstadoSel}
            options={[
              { value: "todos", label: "Todos los estados" },
              { value: "Pendiente", label: "Pendiente" },
              { value: "Pagada", label: "Pagada" },
              { value: "Vencida", label: "Vencida" },
            ]}
          />

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Más Filtros
          </Button>
        </CardContent>
      </Card>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { lbl: "Total Boletas", val: kpi.total, color: "" },
          { lbl: "Pendientes", val: kpi.pendientes, color: "text-amber-600" },
          { lbl: "Pagadas", val: kpi.pagadas, color: "text-green-600" },
          { lbl: "Vencidas", val: kpi.vencidas, color: "text-red-600" },
        ].map((k) => (
          <Card key={k.lbl}>
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${k.color}`}>{k.val}</div>
              <p className="text-sm text-gray-600">{k.lbl}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Boletas</CardTitle>
          <CardDescription>
            {filtradas.length} boleta(s) encontrada(s)
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left font-semibold">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Número</th>
                <th className="px-4 py-2">Placa</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Lugar</th>
                <th className="px-4 py-2">Agente</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((b, idx) => (
                <tr key={b.numero} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{b.numero}</td>
                  <td className="px-4 py-3">{b.placa}</td>
                  <td className="px-4 py-3">
                    {new Date(b.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{b.lugar}</td>
                  <td className="px-4 py-3">{b.agente}</td>
                  <td className="px-4 py-3">${b.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badge(
                        b.estado
                      )}`}
                    >
                      {b.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link to={`/dashboard/boletas/${b.numero}`}>
                        <Button variant="outline" className="p-2">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="p-2">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
