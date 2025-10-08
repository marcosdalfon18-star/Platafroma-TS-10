
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cpu } from "lucide-react";

export default function AiAgentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Agentes IA</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu />
            <span>Agentes IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionarán los agentes de inteligencia artificial.</p>
        </CardContent>
      </Card>
    </div>
  );
}
