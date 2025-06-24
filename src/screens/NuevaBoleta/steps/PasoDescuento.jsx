import Input from "@components/ui/Input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@components/ui/Card";

export default function PasoDescuento({ data, setData }) {
  const update = (f, v) => setData({ ...data, [f]: v });

  const subtotal = data.articulos.reduce((s, a) => s + a.monto, 0);
  const descuento = subtotal * (data.porcentajeDescuento / 100);
  const total = subtotal - descuento;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paso 4: Descuento & Estado</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Porcentaje de Descuento (%)"
            min="0"
            max="100"
            value={data.porcentajeDescuento}
            onChange={(e) =>
              update("porcentajeDescuento", Number(e.target.value) || 0)
            }
          />
          <Input label="Estado Inicial" value={data.estado} disabled />
        </div>

        {/* resumen costos */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Costos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>
                Descuento ({data.porcentajeDescuento}%):
              </span>
              <span>- ${descuento.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* resumen boleta */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de la Boleta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <strong>Vehículo:</strong> {data.placa || "-"}{" "}
              {data.tipoVehiculo && `- ${data.tipoVehiculo}`}
            </p>
            <p>
              <strong>Lugar:</strong> {data.lugar || "-"}
            </p>
            <p>
              <strong>Fecha:</strong> {data.fecha} {data.hora}
            </p>
            <p>
              <strong>Agente:</strong> {data.agente || "-"}
            </p>
            {data.articulos.length > 0 && (
              <p>
                <strong>Artículos:</strong>{" "}
                {data.articulos
                  .map((a) => a.articulo || "—")
                  .join(", ")}
              </p>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
