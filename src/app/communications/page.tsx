
import { Megaphone } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function CommunicationsPage() {
  return (
    <PlaceholderPage
      title="Comunicaciones"
      description="Aquí se gestionarán las comunicaciones internas."
      icon={<Megaphone className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
