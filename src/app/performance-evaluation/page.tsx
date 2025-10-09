
import { BarChart2 } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function PerformanceEvaluationPage() {
  return (
    <PlaceholderPage
      title="Evaluaciones de Desempeño"
      description="Aquí se gestionarán las evaluaciones de desempeño de los empleados."
      icon={<BarChart2 className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
