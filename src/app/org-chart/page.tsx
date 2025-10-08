
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function OrgChartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Organigrama</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users />
            <span>Estructura de la Empresa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se mostrará el organigrama de la empresa.</p>
        </CardContent>
      </Card>
    </div>
  );
}
