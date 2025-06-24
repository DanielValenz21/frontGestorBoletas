import { useState } from "react";
import { Shield } from "lucide-react";

import Button from "@components/ui/Button";
import Input  from "@components/ui/Input";
import Label  from "@components/ui/Label";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@components/ui/Card";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: lógica de autenticación
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <Shield className="h-6 w-6 text-primary-600" />
          </div>
          <CardTitle>Gestor de Boletas</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando sesión…" : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Credenciales por defecto:</p>
            <p><strong>Usuario:</strong> admin</p>
            <p><strong>Contraseña:</strong> admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
