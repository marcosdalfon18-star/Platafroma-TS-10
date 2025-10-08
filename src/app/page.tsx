
'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
    const router = useRouter();
    useEffect(() => {
        router.push('/dashboard');
    }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <div className="w-full max-w-md">
         <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">TS Plataforma Digital</h1>
            <p className="text-muted-foreground">Redirigiendo al dashboard...</p>
         </div>
       </div>
    </div>
  );
}
