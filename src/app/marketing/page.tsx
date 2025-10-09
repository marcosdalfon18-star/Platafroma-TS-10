
import { Target } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function MarketingPage() {
  return (
    <PlaceholderPage
      title="Marketing Estratégico"
      description="Aquí se gestionará el marketing estratégico."
      icon={<Target className="h-16 w-16 text-muted-foreground" />}
    />
  );
}
