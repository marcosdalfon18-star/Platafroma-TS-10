
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function PayrollPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Gestión de Nóminas</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet />
            <span>Gestión de Nóminas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionarán las nóminas.</p>
        </CardContent>
      </Card>
    </div>
  );
}
