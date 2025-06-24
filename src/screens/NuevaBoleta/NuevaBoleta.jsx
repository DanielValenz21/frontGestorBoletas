import { useState } from "react";
import Stepper from "@components/ui/Stepper";
import PasoVehiculo   from "./steps/PasoVehiculo";
import PasoInfractor  from "./steps/PasoInfractor";
import PasoInfraccion from "./steps/PasoInfraccion";
import PasoDescuento  from "./steps/PasoDescuento";
import Button from "@components/ui/Button";

export default function NuevaBoleta() {
  const [step, setStep] = useState(1);

  /* >>> valores por defecto (muestran texto en inputs) <<< */
  const [data, setData] = useState({
    numeroBoletaAuto: `BOL-${Date.now()}`,
    placa: "ABC-123",
    tarjeta: "",
    nit: "",
    tipoVehiculo: "",
    marca: "",
    color: "",
    // … resto igual …
  });

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const save = () => console.log("guardar", data); // TODO

  /* render condicional idéntico ↓ */
  const pasoActual = () => {
    switch (step) {
      case 1: return <PasoVehiculo   data={data} setData={setData} />;
      case 2: return <PasoInfractor  data={data} setData={setData} />;
      case 3: return <PasoInfraccion data={data} setData={setData} />;
      case 4: return <PasoDescuento  data={data} setData={setData} />;
      default: return null;
    }
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Nueva Boleta</h1>
        <p className="text-gray-600">Registro de nueva infracción de tránsito</p>
      </header>

      <Stepper step={step} />

      {pasoActual()}

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prev} disabled={step === 1}>Anterior</Button>
        {step < 4 ? (
          <Button onClick={next}>Siguiente</Button>
        ) : (
          <Button onClick={save}>Guardar Boleta</Button>
        )}
      </div>
    </>
  );
}
