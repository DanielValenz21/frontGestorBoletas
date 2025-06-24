import { useState } from "react";
import Stepper from "@components/ui/Stepper";
import Button from "@components/ui/Button";

import PasoVehiculo from "./steps/PasoVehiculo";
import PasoInfractor from "./steps/PasoInfractor";
import PasoInfraccion from "./steps/PasoInfraccion";
import PasoDescuento from "./steps/PasoDescuento";

export default function NuevaBoleta() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    /* Valores iniciales para mostrar texto / placeholders */
    numeroBoletaAuto: `BOL-${Date.now()}`,
    placa: "ABC-123",
    tarjeta: "",
    nit: "",
    tipoVehiculo: "",
    marca: "",
    color: "",
    // ---- resto de campos ↓
    conductorAusente: false,
    genero: "",
    numeroDocumento: "",
    tipoLicencia: "",
    numeroLicencia: "",
    direccion: "",
    lugar: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toTimeString().slice(0, 5),
    articulos: [{ articulo: "", monto: 0, baseLegal: "" }],
    agente: "",
    observaciones: "",
    porcentajeDescuento: 0,
    total: 0,
    estado: "Pendiente",
  });

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const save = () => {
    const all = JSON.parse(localStorage.getItem("boletas") || "[]");
    all.push({ ...data, fechaCreacion: new Date().toISOString() });
    localStorage.setItem("boletas", JSON.stringify(all));
    window.location.href = "/dashboard/boletas";
  };

  const pasoActual = () => {
    switch (step) {
      case 1:
        return <PasoVehiculo data={data} setData={setData} />;
      case 2:
        return <PasoInfractor data={data} setData={setData} />;
      case 3:
        return <PasoInfraccion data={data} setData={setData} />;
      case 4:
        return <PasoDescuento data={data} setData={setData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Nueva Boleta</h1>
        <p className="text-gray-600">
          Registro de nueva infracción de tránsito
        </p>
      </header>

      <Stepper step={step} />

      {pasoActual()}

      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={prev} disabled={step === 1}>
          Anterior
        </Button>

        {step < 4 ? (
          <Button onClick={next}>Siguiente</Button>
        ) : (
          <Button onClick={save}>Guardar Boleta</Button>
        )}
      </div>
    </>
  );
}
