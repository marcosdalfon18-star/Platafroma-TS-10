
import { Search } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function SelectionProcessesPage() {
  return (
    <PlaceholderPage
      title="Procesos de Selección"
      description="Aquí se gestionarán los procesos de selección."
      icon={<Search className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
