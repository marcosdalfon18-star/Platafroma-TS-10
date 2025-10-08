
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function PlanManagementPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Gestión de Planes</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings />
            <span>Gestión de Planes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionarán los planes de los clientes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
