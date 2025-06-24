import { useState } from "react";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@components/ui/Card";
import Button from "@components/ui/Button";

export default function PasoInfraccion({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  const addArticulo = () =>
    setData({
      ...data,
      articulos: [...data.articulos, { articulo: "", monto: 0, baseLegal: "" }],
    });

  const updateArt = (idx, f, v) =>
    setData({
      ...data,
      articulos: data.articulos.map((a, i) =>
        i === idx ? { ...a, [f]: v } : a
      ),
    });

  const removeArt = (idx) =>
    setData({
      ...data,
      articulos: data.articulos.filter((_, i) => i !== idx),
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 3: Infracción</CardTitle>
        <CardDescription>
          Complete la información requerida para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* fila básica */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Input
            label="Lugar de la Infracción *"
            value={data.lugar}
            onChange={(e) => update("lugar", e.target.value)}
            required
          />
          <Input
            type="date"
            label="Fecha *"
            value={data.fecha}
            onChange={(e) => update("fecha", e.target.value)}
            required
          />
          <Input
            type="time"
            label="Hora *"
            value={data.hora}
            onChange={(e) => update("hora", e.target.value)}
            required
          />
        </div>

        {/* artículos */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">Artículos Infringidos</p>
          <Button variant="outline" onClick={addArticulo}>
            + Agregar Artículo
          </Button>
        </div>

        <div className="space-y-4">
          {data.articulos.map((art, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end"
            >
              <Input
                label="Artículo"
                value={art.articulo}
                onChange={(e) => updateArt(idx, "articulo", e.target.value)}
              />
              <Input
                type="number"
                label="Monto"
                min="0"
                step="0.01"
                value={art.monto}
                onChange={(e) =>
                  updateArt(idx, "monto", parseFloat(e.target.value) || 0)
                }
              />
              <Input
                label="Base Legal"
                value={art.baseLegal}
                onChange={(e) => updateArt(idx, "baseLegal", e.target.value)}
              />

              {data.articulos.length > 1 && (
                <Button
                  variant="danger"
                  className="lg:col-span-3 w-max"
                  onClick={() => removeArt(idx)}
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
        />

        <Textarea
          label="Observaciones"
          rows={3}
          value={data.observaciones}
          onChange={(e) => update("observaciones", e.target.value)}
        />
      </CardContent>
    </Card>
  );
}
