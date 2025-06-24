import { Users, FileText, DollarSign, TrendingUp } from "lucide-react";
import {
  Card, CardHeader, CardContent, CardTitle, CardDescription,
} from "@components/ui/Card";

/* fake métricas --------------------------------------------------------- */
const metrics = [
  { icon: Users,     title: "Total Usuarios",   value: 3,        sub: "3 activos"           },
  { icon: FileText,  title: "Boletas Hoy",      value: 15,       sub: "+12% vs ayer"        },
  { icon: DollarSign,title: "Recaudación Hoy",  value: "$25,000",sub: "+8% vs ayer"         },
  { icon: TrendingUp,title: "Eficiencia",       value: "94%",    sub: "+2% vs mes anterior" },
];

export default function DashboardTab() {
  return (
    <>
      {/* tarjetas superiores ------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metrics.map(({ icon:Icon,title,value,sub }) => (
          <Card key={title}>
            <CardHeader className="flex justify-between items-center pb-2">
              <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
              <span className="p-2 rounded-full bg-primary-50 text-primary-600">
                <Icon className="w-5 h-5" />
              </span>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* gráficos placeholder ------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Placeholder title="Boletas por Agente"      desc="Últimos 30 días" />
        <Placeholder title="Recaudación Mensual"     desc="Últimos 12 meses" />
      </div>
    </>
  );
}

function Placeholder({ title, desc }) {
  return (
    <Card className="h-64 flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-gray-400">
        Gráfico de {title.toLowerCase()}
      </CardContent>
    </Card>
  );
}
