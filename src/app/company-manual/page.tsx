
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

export default function CompanyManualPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manual de Empresa</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book />
            <span>Manual de Empresa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se podrá consultar el manual de la empresa.</p>
        </CardContent>
      </Card>
    </div>
  );
}
