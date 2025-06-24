import { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import Button from "@components/ui/Button";
import {
  Card, CardHeader, CardContent, CardTitle, CardDescription,
} from "@components/ui/Card";

/* datos ficticios iniciales ------------------------------------------- */
const seed = [
  { id:1, nombre:"Administrador", usuario:"admin", email:"admin@sistema.com", rol:"Administrador", estado:"Activo" },
  { id:2, nombre:"Juan Pérez",    usuario:"jperez",email:"jperez@sistema.com", rol:"Agente",        estado:"Activo" },
  { id:3, nombre:"María García",  usuario:"mgarcia",email:"mgarcia@sistema.com",rol:"Cajero",       estado:"Activo" },
];

export default function UsuariosTab() {
  const [users,setUsers] = useState(seed);

  const del = (id) => setUsers(users.filter(u=>u.id!==id));

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
          <p className="text-gray-600">Administrar usuarios y roles del sistema</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Nuevo Usuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>{users.length} usuario(s) registrado(s)</CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                {["Nombre","Usuario","Email","Rol","Estado","Acciones"].map(th=>(
                  <th key={th} className="px-4 py-2 text-left font-medium">{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id} className="border-b last:border-0">
                  <td className="px-4 py-3">{u.nombre}</td>
                  <td className="px-4 py-3">{u.usuario}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                       ${u.rol==="Administrador"?"bg-red-100 text-red-600":
                         u.rol==="Agente"       ?"bg-green-100 text-green-600":
                                                 "bg-yellow-100 text-yellow-800"}`}>
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <Button variant="outline" className="p-2">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="p-2"
                      onClick={()=>del(u.id)}
                    >
                      <Trash className="w-4 h-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
