import { useMemo, useState } from "react";
import {
  FileText,
  DollarSign,
  LineChart,
  BarChart3,
  Download,
  CalendarDays,
  User as UserIcon,
  MapPin,
} from "lucide-react";

import Button       from "@components/ui/Button";
import Input        from "@components/ui/Input";
import Select       from "@components/ui/Select";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@components/ui/Card";

/* -------------------------------------------------------------
 *  utilidades “fake” para conseguir métricas desde localStorage
 * ----------------------------------------------------------- */
function useStats() {
  const boletas = useMemo(
    () => JSON.parse(localStorage.getItem("boletas") || "[]"),
    []
  );

  /* métricas superiores ------------------------------------ */
  const total           = boletas.length;
  const pagadas         = boletas.filter((b) => b.estado === "Pagada");
  const recaudacion     = pagadas.reduce((s, b) => s + (b.total || 0), 0);
  const promedio        = pagadas.length
    ? recaudacion / pagadas.length
    : 0;
  const tasaPago        = total ? (pagadas.length / total) * 100 : 0;

  /* distribución por estado -------------------------------- */
  const dist = {
    Pendientes: boletas.filter((b) => b.estado === "Pendiente").length,
    Pagadas:    pagadas.length,
    Vencidas:   boletas.filter((b) => b.estado === "Vencida").length,
  };

  return { total, recaudacion, promedio, tasaPago, dist };
}

/* ----------------------------------------------------------- */

export default function Reportes() {
  const { total, recaudacion, promedio, tasaPago, dist } = useStats();

  /* estado del formulario “Generar reporte” ---------------- */
  const [tipo,      setTipo]   = useState("general");
  const [desde,     setDesde]  = useState("");
  const [hasta,     setHasta]  = useState("");
  const [agente,    setAgente] = useState("");

  const generar = (e) => {
    e.preventDefault();
    alert(
      `Generando reporte:\nTipo: ${tipo}\nDesde: ${desde}\nHasta: ${hasta}\nAgente: ${agente || "Todos"}`
    );
  };

  /* ------------------------------------------------------- */
  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Reportes</h1>
        <p className="text-gray-600">Análisis y exportación de datos del sistema</p>
      </header>

      {/* métricas superiores -------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatTile icon={FileText}  label="Total Boletas"       value={total}               sub="Todas las boletas registradas" />
        <StatTile icon={DollarSign}label="Recaudación Total"   value={`$${recaudacion.toFixed(2)}`} sub="Solo boletas pagadas" />
        <StatTile icon={LineChart} label="Promedio por Multa"  value={`$${promedio.toFixed(0)}`}    sub="Valor promedio" />
        <StatTile icon={BarChart3} label="Tasa de Pago"        value={`${tasaPago.toFixed(0)}%`}    sub="Boletas pagadas vs total" />
      </div>

      {/* 2 columnas principales ----------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generar Reporte FORM ----------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Generar Reporte</CardTitle>
            <CardDescription>
              Configure los parámetros para generar un reporte personalizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={generar} className="space-y-4">
              <Select
                label="Tipo de Reporte"
                value={tipo}
                onChange={setTipo}
                options={[
                  { value: "general",   label: "Reporte General de Boletas" },
                  { value: "finanzas",  label: "Reporte Financiero" },
                  { value: "agentes",   label: "Productividad por Agente" },
                ]}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Fecha Desde"
                  value={desde}
                  onChange={(e) => setDesde(e.target.value)}
                  placeholder="dd/mm/aaaa"
                />
                <Input
                  type="date"
                  label="Fecha Hasta"
                  value={hasta}
                  onChange={(e) => setHasta(e.target.value)}
                  placeholder="dd/mm/aaaa"
                />
              </div>

              <Select
                label="Agente (Opcional)"
                value={agente}
                onChange={setAgente}
                options={[
                  { value: "",   label: "Todos los agentes" },
                  { value: "Luis", label: "Luis" },
                  { value: "Maria",label: "María" },
                ]}
              />

              <Button type="submit" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reportes predefinidos ---------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Reportes Predefinidos</CardTitle>
            <CardDescription>
              Descargue reportes comunes con un solo clic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {presetRows.map((p) => (
              <PresetRow key={p.label} {...p} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* fila inferior  ----------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Distribución por estado */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Estado</CardTitle>
            <CardDescription>Estado actual de las boletas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {Object.entries(dist).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className={`block w-3 h-3 rounded-full ${
                      { Pendientes: "bg-yellow-500",
                        Pagadas:    "bg-green-600",
                        Vencidas:   "bg-red-600" }[k] }`}
                  />
                  {k}
                </span>
                <span className="font-medium">
                  {v} {total ? `(${Math.round((v / total) * 100)}%)` : ""}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tendencia mensual (placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia Mensual</CardTitle>
            <CardDescription>Boletas registradas por mes</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-48 text-gray-400">
            Gráfico de tendencia mensual
          </CardContent>
        </Card>
      </div>
    </>
  );
}

/* ---------- componentes auxiliares ----------------------- */
function StatTile({ icon: Icon, label, value, sub }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-gray-500">{sub}</p>
        </div>
        <span className="p-2 rounded-full bg-primary-50 text-primary-600">
          <Icon className="w-5 h-5" />
        </span>
      </CardHeader>
    </Card>
  );
}

const presetRows = [
  {
    label: "Boletas del Mes",
    desc: "Todas las boletas del mes actual",
    icon: FileText,
  },
  {
    label: "Recaudación Mensual",
    desc: "Ingresos por boletas pagadas",
    icon: DollarSign,
  },
  {
    label: "Productividad Agentes",
    desc: "Boletas por agente",
    icon: UserIcon,
  },
  {
    label: "Puntos Críticos",
    desc: "Ubicaciones con más infracciones",
    icon: MapPin,
  },
];

function PresetRow({ icon: Icon, label, desc }) {
  const click = (fmt) => alert(`Descargando ${label} en ${fmt}`);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <Icon className="w-4 h-4 mt-1 text-primary-600" />
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {["Excel", "PDF"].map((f) => (
          <Button
            key={f}
            variant="outline"
            className="px-2 py-1"
            onClick={() => click(f)}
          >
            {f === "PDF" ? (
              <Download className="w-4 h-4" />
            ) : (
              <span className="text-xs font-semibold">{f}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
