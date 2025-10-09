
import { FileText } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function ReportsPage() {
  return (
    <PlaceholderPage
      title="Centro de Informes"
      description="Aquí se generarán y visualizarán informes."
      icon={<FileText className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
