import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@components/ui/Card";

export default function PasoVehiculo({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 1: Vehículo</CardTitle>
        <CardDescription>
          Complete la información requerida para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Número de Boleta (Auto)"
            value={data.numeroBoletaAuto}
            disabled
          />
          <Input
            label="Placa *"
            placeholder="Ej: ABC-123"
            value={data.placa}
            onChange={(e) => update("placa", e.target.value)}
            required
          />
          <Input
            label="Tarjeta"
            placeholder="Número de tarjeta"
            value={data.tarjeta}
            onChange={(e) => update("tarjeta", e.target.value)}
          />
          <Input
            label="NIT"
            placeholder="NIT del propietario"
            value={data.nit}
            onChange={(e) => update("nit", e.target.value)}
          />
          <Select
            label="Tipo de Vehículo *"
            value={data.tipoVehiculo}
            onChange={(v) => update("tipoVehiculo", v)}
            options={[
              { value: "automovil", label: "Automóvil" },
              { value: "motocicleta", label: "Motocicleta" },
              { value: "camion", label: "Camión" },
              { value: "bus", label: "Bus" },
            ]}
          />
          <Input
            label="Marca"
            placeholder="Marca del vehículo"
            value={data.marca}
            onChange={(e) => update("marca", e.target.value)}
          />
          <Input
            label="Color"
            placeholder="Color del vehículo"
            value={data.color}
            onChange={(e) => update("color", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
