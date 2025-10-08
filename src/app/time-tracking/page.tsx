
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function TimeTrackingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Control Horario</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock />
            <span>Control Horario</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionará el control horario.</p>
        </CardContent>
      </Card>
    </div>
  );
}
