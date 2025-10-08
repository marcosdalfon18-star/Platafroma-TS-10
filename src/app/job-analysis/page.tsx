
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default function JobAnalysisPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Análisis de Puestos</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList />
            <span>Análisis de Puestos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionará el análisis de puestos.</p>
        </CardContent>
      </Card>
    </div>
  );
}
