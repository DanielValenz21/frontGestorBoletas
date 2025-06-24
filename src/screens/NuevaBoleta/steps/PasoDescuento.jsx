import Input from "@components/ui/Input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@components/ui/Card";

export default function PasoDescuento({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 4: Descuento & Estado</CardTitle>
        <CardDescription>Aplica descuento y define el estado de la boleta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Descuento (%)" value={data.descuento} onChange={e=>update("descuento",e.target.value)} />
          <Input label="Estado" value={data.estado} onChange={e=>update("estado",e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
