'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Crear Cuenta</CardTitle>
                    <CardDescription>Funcionalidad de registro deshabilitada temporalmente.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center p-8 text-muted-foreground">
                        El registro de nuevos usuarios se activará en una futura versión.
                    </div>
                    <p className="text-sm text-center text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/" className="font-medium text-primary hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
