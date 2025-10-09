
import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
        <div className="text-center">
            <div className="inline-block p-6 bg-muted rounded-full mb-4">
                {icon}
            </div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
        </div>
    </div>
  );
}
