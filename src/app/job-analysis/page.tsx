
import { ClipboardList } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function JobAnalysisPage() {
  return (
    <PlaceholderPage
      title="Análisis de Puestos"
      description="Aquí se gestionará el análisis de puestos."
      icon={<ClipboardList className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
