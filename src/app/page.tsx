
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">¡Bienvenido a tu Plataforma!</CardTitle>
          <CardDescription>Este es el punto de partida de tu aplicación.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <p className="text-center text-muted-foreground">
                Desde aquí, puedes navegar a las diferentes secciones de tu aplicación.
            </p>
          <Link href="/ussertable" passHref>
            <Button className="w-full">
              Ir a la Tabla de Usuarios
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline" className="w-full">
              Iniciar Sesión
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
