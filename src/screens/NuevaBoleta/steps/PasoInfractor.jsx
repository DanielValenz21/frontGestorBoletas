import Input from "@components/ui/Input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@components/ui/Card";

export default function PasoInfractor({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 2: Infractor</CardTitle>
        <CardDescription>Datos del conductor infractor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre *" value={data.nombre} onChange={e=>update("nombre",e.target.value)} />
          <Input label="DPI *" value={data.dpi} onChange={e=>update("dpi",e.target.value)} />
          <Input label="Licencia" value={data.licencia} onChange={e=>update("licencia",e.target.value)} />
          <Input label="Dirección" value={data.direccion} onChange={e=>update("direccion",e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
