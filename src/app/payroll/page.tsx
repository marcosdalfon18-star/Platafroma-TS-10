
import { Wallet } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function PayrollPage() {
  return (
    <PlaceholderPage
      title="Gestión de Nóminas"
      description="Aquí se gestionarán las nóminas."
      icon={<Wallet className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
