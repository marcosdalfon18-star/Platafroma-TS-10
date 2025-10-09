
import { Clock } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function TimeTrackingPage() {
  return (
    <PlaceholderPage
      title="Control Horario"
      description="Aquí se gestionará el control horario."
      icon={<Clock className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
