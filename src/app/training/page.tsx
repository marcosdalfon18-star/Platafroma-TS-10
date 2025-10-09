
import { ClipboardList } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function TrainingPage() {
  return (
    <PlaceholderPage
      title="Capacitaciones"
      description="Aquí se gestionarán los planes de capacitación y formación."
      icon={<ClipboardList className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
