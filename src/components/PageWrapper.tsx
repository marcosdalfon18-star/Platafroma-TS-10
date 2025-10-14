import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, title = "Cargando..." }) => {
  return (
    <Suspense fallback={<LoadingPage title={title} />}>
      {children}
    </Suspense>
  );
};

const LoadingPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground text-center">
          Cargando módulo, por favor espera...
        </p>
        <div className="mt-4 w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-1/2 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PageWrapper;