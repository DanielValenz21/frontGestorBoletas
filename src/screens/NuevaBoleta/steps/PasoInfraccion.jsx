import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import Button from "@components/ui/Button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@components/ui/Card";

export default function PasoInfraccion({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  const addArticulo = () =>
    setData({
      ...data,
      articulos: [...data.articulos, { articulo: "", monto: 0, baseLegal: "" }],
    });

  const updateArt = (i, f, v) =>
    setData({
      ...data,
      articulos: data.articulos.map((a, idx) =>
        idx === i ? { ...a, [f]: v } : a
      ),
    });

  const removeArt = (i) =>
    setData({ ...data, articulos: data.articulos.filter((_, idx) => idx !== i) });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 3: Infracción</CardTitle>
        <CardDescription>Complete la información requerida para continuar</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Input
            label="Lugar de la Infracción *"
            value={data.lugar}
            onChange={(e) => update("lugar", e.target.value)}
            required
            placeholder="Ej: Calle Principal 123"
          />
          <Input
            type="date"
            label="Fecha *"
            value={data.fecha}
            onChange={(e) => update("fecha", e.target.value)}
            required
            placeholder="Selecciona la fecha"
          />
          <Input
            type="time"
            label="Hora *"
            value={data.hora}
            onChange={(e) => update("hora", e.target.value)}
            required
            placeholder="Selecciona la hora"
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium text-sm">Artículos Infringidos</p>
          <Button variant="outline" onClick={addArticulo}>
            + Agregar Artículo
          </Button>
        </div>

        <div className="space-y-4">
          {data.articulos.map((art, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
              <Input
                label="Artículo"
                value={art.articulo}
                onChange={(e) => updateArt(i, "articulo", e.target.value)}
                placeholder="Ej: 42, 5.1, etc."
              />
              <Input
                type="number"
                min="0"
                step="0.01"
                label="Monto"
                value={art.monto}
                onChange={(e) => updateArt(i, "monto", parseFloat(e.target.value) || 0)}
                placeholder="Ej: 1000"
              />
              <Input
                label="Base Legal"
                value={art.baseLegal}
                onChange={(e) => updateArt(i, "baseLegal", e.target.value)}
                placeholder="Ej: Ley 18.290 Art. 42"
              />
              {data.articulos.length > 1 && (
                <Button
                  variant="danger"
                  className="lg:col-span-3 w-max"
                  onClick={() => removeArt(i)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>

        <Input
          label="Agente"
          value={data.agente}
          onChange={(e) => update("agente", e.target.value)}
          placeholder="Nombre del agente"
        />
        <Textarea
          label="Observaciones"
          rows={3}
          value={data.observaciones}
          onChange={(e) => update("observaciones", e.target.value)}
          placeholder="Agrega observaciones relevantes (opcional)"
        />
      </CardContent>
    </Card>
  );
}
