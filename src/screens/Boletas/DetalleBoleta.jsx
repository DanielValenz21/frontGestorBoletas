import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  DollarSign,
  CalendarDays,
  MapPin,
} from "lucide-react";

import Button from "@components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@components/ui/Card";

/* helpers -------------------------------------------------- */
const badgeClass = (e) =>
  ({
    Pendiente: "bg-amber-100 text-amber-800",
    Pagada: "bg-green-100 text-green-800",
    Vencida: "bg-red-100 text-red-800",
  }[e] || "bg-gray-100 text-gray-600");

function getBoleta(id) {
  const all = JSON.parse(localStorage.getItem("boletas") || "[]");
  return all.find((b) => b.numero === id);
}

function saveBoleta(updated) {
  const all = JSON.parse(localStorage.getItem("boletas") || "[]").map((b) =>
    b.numero === updated.numero ? updated : b
  );
  localStorage.setItem("boletas", JSON.stringify(all));
}
/* ---------------------------------------------------------- */

export default function DetalleBoleta() {
  const { id } = useParams();
  const nav = useNavigate();

  const [boleta, setBoleta] = useState(() => getBoleta(id));
  const [showPago, setShowPago] = useState(false);
  const [pagoFecha, setPagoFecha] = useState("");
  const [pagoRecibo, setPagoRecibo] = useState("");
  const [pagoError, setPagoError] = useState("");
  const [pagoSuccess, setPagoSuccess] = useState(false);
  const pagoRef = useRef();

  /* si alguien recarga y la boleta no existe → volver */
  useEffect(() => {
    if (!boleta) nav("/dashboard/boletas");
  }, [boleta, nav]);

  if (!boleta) return null; // fallback rápido

  /* ---- UI ---- */
  const abrirPago = () => {
    setPagoFecha("");
    setPagoRecibo("");
    setPagoError("");
    setShowPago(true);
    setTimeout(() => pagoRef.current?.focus(), 100);
  };

  const confirmarPago = () => {
    if (!pagoFecha || !pagoRecibo) {
      setPagoError("Todos los campos son obligatorios");
      return;
    }
    if (isNaN(new Date(pagoFecha).getTime())) {
      setPagoError("Fecha inválida");
      return;
    }
    const updated = {
      ...boleta,
      estado: "Pagada",
      fechaPago: pagoFecha,
      reciboPago: pagoRecibo,
    };
    setBoleta(updated);
    saveBoleta(updated);
    setShowPago(false);
    setPagoSuccess(true);
    setTimeout(() => {
      setPagoSuccess(false);
      nav("/dashboard/boletas");
    }, 2000);
  };

  return (
    <>
      {/* header ------------------------------------------------ */}
      <header className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="px-3"
            onClick={() => nav(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>

          <div>
            <h1 className="text-3xl font-extrabold">
              Boleta {boleta.numero}
            </h1>
            <p className="text-gray-600">Detalle completo de la infracción</p>
          </div>
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${badgeClass(
              boleta.estado
            )}`}
          >
            {boleta.estado}
          </span>

          <Button
            disabled={boleta.estado !== "Pendiente"}
            onClick={abrirPago}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Registrar Pago
          </Button>

          <Button variant="outline" onClick={() => alert("PDF…")}>Descargar PDF</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* columna principal (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* vehículo */}
          <Section title="Información del Vehículo" icon="🚗">
            <Info  label="Placa"        value={boleta.placa} />
            <Info  label="Tipo de Vehículo" value={boleta.tipoVehiculo} />
            <Info  label="Marca"        value={boleta.marca} />
            <Info  label="Color"        value={boleta.color} />
            <Info  label="Tarjeta"      value={boleta.tarjeta} />
            <Info  label="NIT"          value={boleta.nit} />
          </Section>

          {/* infractor */}
          <Section title="Información del Infractor" icon="👤">
            <Info label="Conductor Ausente" value={boleta.conductorAusente ? "Sí" : "No"} />
            <Info label="Género"            value={boleta.genero} />
            <Info label="Número de Documento" value={boleta.numeroDocumento} />
            <Info label="Tipo de Licencia"  value={boleta.tipoLicencia} />
            <Info label="Número de Licencia" value={boleta.numeroLicencia} />
            <Info label="Dirección"         value={boleta.direccion} wide />
          </Section>

          {/* infracción */}
          <Section title="Información de la Infracción" icon="📄">
            <Info label="Lugar"      value={boleta.lugar} wide />
            <Info label="Fecha y Hora" value={`${boleta.fecha} – ${boleta.hora}`} />
            <Info label="Agente"     value={boleta.agente} />
            <p className="font-medium text-sm mt-4">Artículos Infringidos</p>
            {boleta.articulos.map((a, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-2"
              >
                <Info label="Artículo" value={a.articulo} />
                <Info label="Monto"    value={`$${a.monto.toFixed(2)}`} />
                <Info label="Base Legal" value={a.baseLegal} />
              </div>
            ))}
            {boleta.observaciones && (
              <Info label="Observaciones" value={boleta.observaciones} wide />
            )}
          </Section>
        </div>

        {/* sidebar (1/3) */}
        <div className="space-y-6">
          {/* resumen financiero */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" /> Resumen Financiero
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Subtotal:"      value={`$${boleta.subtotal?.toFixed?.(2) ?? "0.00"}`} />
              <Row
                label={`Descuento (${boleta.porcentajeDescuento ?? 0}%):`}
                value={`-$${((boleta.subtotal || 0) * (boleta.porcentajeDescuento || 0) / 100).toFixed(2)}`}
                className="text-green-600"
              />
              <hr />
              <Row
                label="Total:"
                value={`$${boleta.total?.toFixed?.(2) ?? "0.00"}`}
                className="font-bold text-lg"
              />
            </CardContent>
          </Card>

          {/* fechas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" /> Fechas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <Row
                label="Fecha de Creación"
                value={new Date(boleta.fechaCreacion).toLocaleString()}
              />
            </CardContent>
          </Card>

          {/* ubicación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {boleta.lugar}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de pago */}
      {showPago && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPago(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-1">Registrar Pago</h2>
            <p className="text-gray-600 mb-4">Complete la información del pago realizado</p>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Fecha de Pago</label>
              <input
                ref={pagoRef}
                type="date"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={pagoFecha}
                onChange={e => setPagoFecha(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Número de Recibo</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={pagoRecibo}
                onChange={e => setPagoRecibo(e.target.value)}
                placeholder="Número de recibo de pago"
              />
            </div>
            {pagoError && <div className="text-red-600 text-sm mb-2">{pagoError}</div>}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowPago(false)}>Cancelar</Button>
              <Button variant="success" onClick={confirmarPago}>Confirmar Pago</Button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {pagoSuccess && (
        <div className="fixed bottom-8 right-8 bg-white border shadow-lg rounded-lg p-4 z-50">
          <div className="font-bold mb-1">Pago registrado exitosamente</div>
          <div>La boleta ha sido marcada como pagada</div>
        </div>
      )}
    </>
  );
}

/* ---------- helpers UI pequeños --------------------------- */
function Section({ title, icon, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{icon}</span> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        {children}
      </CardContent>
    </Card>
  );
}

function Info({ label, value, wide = false }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium break-words">{value || "—"}</p>
    </div>
  );
}

function Row({ label, value, className = "" }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
