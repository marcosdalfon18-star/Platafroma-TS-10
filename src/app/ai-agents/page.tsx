
import { Cpu } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function AiAgentsPage() {
  return (
    <PlaceholderPage
      title="Agentes IA"
      description="Aquí se gestionarán los agentes de inteligencia artificial."
      icon={<Cpu className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
