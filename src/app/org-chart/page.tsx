
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function OrgChartPage() {
  return (
    <PlaceholderPage
      title="Organigrama"
      description="Aquí se mostrará el organigrama de la empresa."
      icon={<Users className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
