
import { Settings } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function PlanManagementPage() {
  return (
    <PlaceholderPage
      title="Gestión de Planes"
      description="Aquí se gestionarán los planes de los clientes."
      icon={<Settings className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
