import Input from "@components/ui/Input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@components/ui/Card";

export default function PasoInfraccion({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 3: Infracción</CardTitle>
        <CardDescription>Detalles de la infracción cometida</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Código de Infracción *" value={data.codigoInfraccion} onChange={e=>update("codigoInfraccion",e.target.value)} />
          <Input label="Descripción" value={data.descripcionInfraccion} onChange={e=>update("descripcionInfraccion",e.target.value)} />
          <Input label="Monto Q *" value={data.monto} onChange={e=>update("monto",e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
