
import { Book } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function CompanyManualPage() {
  return (
    <PlaceholderPage
      title="Manual de Empresa"
      description="Aquí se podrá consultar el manual de la empresa."
      icon={<Book className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
