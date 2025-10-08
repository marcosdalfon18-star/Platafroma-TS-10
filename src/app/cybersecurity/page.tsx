
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function CybersecurityPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Ciberseguridad</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck />
            <span>Ciberseguridad</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionarán las políticas de ciberseguridad.</p>
        </CardContent>
      </Card>
    </div>
  );
}
