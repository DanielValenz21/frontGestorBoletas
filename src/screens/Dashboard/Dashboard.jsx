import {
  FileText, Clock, CheckCircle, XCircle, DollarSign, TrendingUp,
} from "lucide-react";
import {
  Card, CardHeader, CardContent, CardTitle, CardDescription,
} from "@components/ui/Card";

export default function Dashboard() {
  // dummy data (reemplaza luego por fetch)
  const stats = {
    total: 1, pendientes: 1, pagadas: 0, vencidas: 0,
    recaudacion: 0, hoy: 0,
  };

  const tiles = [
    {title:"Total Boletas",val:stats.total, desc:"Boletas registradas", icon:FileText , bg:"bg-blue-100",color:"text-blue-600"},
    {title:"Pendientes"   ,val:stats.pendientes,desc:"Por pagar",       icon:Clock    , bg:"bg-yellow-100",color:"text-yellow-600"},
    {title:"Pagadas"      ,val:stats.pagadas,   desc:"Completadas",     icon:CheckCircle,bg:"bg-green-100",color:"text-green-600"},
    {title:"Vencidas"     ,val:stats.vencidas,  desc:"Fuera de plazo",  icon:XCircle  , bg:"bg-red-100",color:"text-red-600"},
    {title:"Recaudación"  ,val:`$${stats.recaudacion}`,desc:"Este mes", icon:DollarSign,bg:"bg-green-100",color:"text-green-600"},
    {title:"Boletas Hoy"  ,val:stats.hoy, desc:"Registradas hoy",       icon:TrendingUp,bg:"bg-purple-100",color:"text-purple-600"},
  ];

  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Resumen general del sistema de boletas</p>
      </header>

      {/* top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tiles.map(({title,val,desc,icon:Icon,bg,color})=>(
          <Card key={title} className="hover:shadow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
              <div className={["p-2 rounded-full", bg].join(" ")}>
                <Icon className={["w-4 h-4", color].join(" ")} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{val}</div>
              <p className="text-xs text-gray-600">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* columnas inferiores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas boletas registradas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1,2,3].map(i=>(
              <div key={i} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <div>
                  <p className="font-medium">Boleta #{1000+i}</p>
                  <p className="text-sm text-gray-600">Placa: ABC-{i}23</p>
                </div>
                <span className="text-sm text-gray-500">Pendiente</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Estados de boletas */}
        <Card>
          <CardHeader>
            <CardTitle>Estados de Boletas</CardTitle>
            <CardDescription>Distribución por estado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StateRow label="Pendientes" color="bg-yellow-500" value={stats.pendientes}/>
            <StateRow label="Pagadas"    color="bg-green-500"  value={stats.pagadas}/>
            <StateRow label="Vencidas"   color="bg-red-500"    value={stats.vencidas}/>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function StateRow({label,color,value}){
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className={["w-3 h-3 rounded-full", color].join(" ")}></span>
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}
