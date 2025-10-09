
import { MessageSquare } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function InterviewsPage() {
  return (
    <PlaceholderPage
      title="Gestión de Entrevistas"
      description="Aquí se gestionarán las entrevistas de los procesos de selección."
      icon={<MessageSquare className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
