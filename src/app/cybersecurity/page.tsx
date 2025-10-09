
import { ShieldCheck } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function CybersecurityPage() {
  return (
    <PlaceholderPage
      title="Ciberseguridad"
      description="Aquí se gestionarán las políticas de ciberseguridad."
      icon={<ShieldCheck className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
