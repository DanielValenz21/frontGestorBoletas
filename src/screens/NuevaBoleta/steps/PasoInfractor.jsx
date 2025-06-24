import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Textarea from "@components/ui/Textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@components/ui/Card";

export default function PasoInfractor({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 2: Infractor</CardTitle>
        <CardDescription>Datos del conductor infractor</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Checkbox */}
        <div className="flex items-center gap-3">
          <input
            id="ausente"
            type="checkbox"
            checked={data.conductorAusente}
            onChange={(e) => update("conductorAusente", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
          />
          <label htmlFor="ausente" className="text-sm text-gray-700">
            Conductor Ausente
          </label>
        </div>

        {/* Grid de campos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Select
            label="Género"
            value={data.genero}
            onChange={(v) => update("genero", v)}
            options={[
              { value: "masculino", label: "Masculino" },
              { value: "femenino", label: "Femenino" },
            ]}
          />

          <Input
            label="Número de Documento"
            value={data.numeroDocumento}
            onChange={(e) => update("numeroDocumento", e.target.value)}
          />

          <Select
            label="Tipo de Licencia"
            value={data.tipoLicencia}
            onChange={(v) => update("tipoLicencia", v)}
            options={[
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" },
              { value: "B1", label: "B1" },
              { value: "B2", label: "B2" },
              { value: "C1", label: "C1" },
              { value: "C2", label: "C2" },
            ]}
          />

          <Input
            label="Número de Licencia"
            value={data.numeroLicencia}
            onChange={(e) => update("numeroLicencia", e.target.value)}
          />
        </div>

        <Textarea
          label="Dirección"
          rows={3}
          value={data.direccion}
          onChange={(e) => update("direccion", e.target.value)}
        />
      </CardContent>
    </Card>
  );
}
