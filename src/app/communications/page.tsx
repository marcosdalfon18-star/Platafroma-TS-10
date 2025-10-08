
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export default function CommunicationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Comunicaciones</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone />
            <span>Comunicaciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionarán las comunicaciones internas.</p>
        </CardContent>
      </Card>
    </div>
  );
}
