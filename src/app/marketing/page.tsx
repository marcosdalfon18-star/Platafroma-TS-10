
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

export default function MarketingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Marketing Estratégico</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target />
            <span>Marketing Estratégico</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página en construcción. Aquí se gestionará el marketing estratégico.</p>
        </CardContent>
      </Card>
    </div>
  );
}
