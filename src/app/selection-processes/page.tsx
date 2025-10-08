
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function SelectionProcessesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Procesos de Selección</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search />
            <span>Procesos de Selección</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionarán los procesos de selección.</p>
        </CardContent>
      </Card>
    </div>
  );
}
