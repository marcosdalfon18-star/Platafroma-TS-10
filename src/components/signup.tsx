"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function Signup() {

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
            <CardDescription>Regístrate para empezar a gestionar el talento de forma sostenible.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center p-8 text-muted-foreground">
                El registro de nuevos usuarios está deshabilitado temporalmente.
            </div>
        </CardContent>
    </Card>
  );
}
