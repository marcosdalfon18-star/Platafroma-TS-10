
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Centro de Informes</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            <span>Centro de Informes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se generarán y visualizarán informes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
