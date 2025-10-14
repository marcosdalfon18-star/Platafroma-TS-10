import "@/app/globals.css";
import React from 'react';
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayoutContent } from "@/components/AppLayoutContent";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Plataforma TS 10 - Gestión de Talento",
  description: "Sistema completo de gestión de talento humano con IA",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`h-full ${inter.variable}`}>
      <body className="h-full font-sans antialiased bg-background">
        <AuthProvider>
          <AppLayoutContent>
            {children}
          </AppLayoutContent>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
