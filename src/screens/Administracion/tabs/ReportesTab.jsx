import Button from "@components/ui/Button";
import Input  from "@components/ui/Input";
import Select from "@components/ui/Select";
import { Download } from "lucide-react";
import {
  Card, CardHeader, CardContent, CardTitle, CardDescription,
} from "@components/ui/Card";

export default function ReportesTab() {
  /* placeholders de descarga ----------------------------------------- */
  const alertDown = (msg)=>alert(`Descargando ${msg}`);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Reportes</h2>
      <p className="text-gray-600 mb-8">Generar y descargar reportes del sistema</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reporte de Boletas */}
        <Card>
          <CardHeader>
            <CardTitle>Reporte de Boletas</CardTitle>
            <CardDescription>
              Exportar todas las boletas por rango de fechas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="date" label="Fecha Inicio" />
            <Input type="date" label="Fecha Fin" />
            <Button className="w-full" onClick={()=>alertDown("boletas.xlsx")}>\n              <Download className="w-4 h-4 mr-2" /> Descargar Excel
            </Button>
          </CardContent>
        </Card>

        {/* Reporte de Recaudación */}
        <Card>
          <CardHeader>
            <CardTitle>Reporte de Recaudación</CardTitle>
            <CardDescription>Resumen financiero por período</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Período"
              options={[
                { value:"mes", label:"Mes actual" },
                { value:"trimestre", label:"Último trimestre" },
              ]}
            />
            <Button className="w-full" onClick={()=>alertDown("recaudacion.pdf")}>\n              <Download className="w-4 h-4 mr-2" /> Descargar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Reporte por Agente */}
        <Card>
          <CardHeader>
            <CardTitle>Reporte por Agente</CardTitle>
            <CardDescription>Productividad y estadísticas por agente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Agente"
              options={[
                { value:"", label:"Seleccionar agente" },
                { value:"Luis", label:"Luis" },
                { value:"Maria",label:"María" },
              ]}
            />
            <Button className="w-full" onClick={()=>alertDown("agente.xlsx")}>\n              <Download className="w-4 h-4 mr-2" /> Descargar Excel
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
