import Input  from "@components/ui/Input";
import Select from "@components/ui/Select";
import Button from "@components/ui/Button";
import {
  Card, CardHeader, CardContent, CardTitle,
} from "@components/ui/Card";

export default function ConfiguracionTab() {
  const save  = ()=>alert("Configuración guardada");
  const test  = ()=>alert("Conexión SMTP OK");

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Configuración</h2>
      <p className="text-gray-600 mb-8">Configuración general del sistema</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Config general */}
        <Card>
          <CardHeader><CardTitle>Configuración General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="Nombre del Sistema" defaultValue="Gestor de Boletas" />
            <Select
              label="Moneda"
              options={[
                { value:"COP", label:"Peso Colombiano (COP)" },
                { value:"GTQ", label:"Quetzal (GTQ)" },
                { value:"USD", label:"Dólar (USD)" },
              ]}
              value="COP"
              onChange={()=>{}}
            />
            <Input
              type="number"
              min="1"
              label="Días para Vencimiento"
              defaultValue="30"
            />
            <Button onClick={save}>Guardar Configuración</Button>
          </CardContent>
        </Card>

        {/* Config email */}
        <Card>
          <CardHeader><CardTitle>Configuración de Email</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="Servidor SMTP"  defaultValue="smtp.gmail.com" />
            <Input label="Puerto"         defaultValue="587" />
            <Input label="Usuario"        defaultValue="usuario@gmail.com" />
            <Input type="password" label="Contraseña" placeholder="contraseña" />
            <Button onClick={test}>Probar Conexión</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
