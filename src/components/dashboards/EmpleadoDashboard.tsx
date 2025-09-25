"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import UploadDocumentModal from "@/components/modals/UploadDocumentModal";
import Chatbot from "@/components/Chatbot"; // Importar el nuevo componente

type Document = {
    id: number;
    name: string;
};

export default function EmpleadoDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "Contrato de Trabajo.pdf" },
    { id: 2, name: "Certificado de Formación.pdf" },
  ]);

  const handleFileUpload = (file: File) => {
    console.log(`Empleado subió el archivo: ${file.name}`);
    const newDocument = {
        id: Date.now(),
        name: file.name,
    };
    setDocuments(prevDocs => [...prevDocs, newDocument]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background">
      <div className="w-full max-w-4xl mx-auto space-y-6">
          <header>
            <h1 className="text-3xl font-bold">Portal del Empleado 🧑‍💻</h1>
            <p className="text-muted-foreground">Bienvenido, aquí puedes gestionar tu información y documentos.</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            Mis Documentos
                        </div>
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Subir Documento
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {documents.length > 0 ? (
                        <ul className="space-y-2">
                            {documents.map(doc => (
                                <li key={doc.id} className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                    {doc.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-muted-foreground">No tienes documentos subidos.</p>
                    )}
                </CardContent>
            </Card>
            
            <Chatbot />
          </div>
      </div>

      <UploadDocumentModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFileUpload={handleFileUpload}
      />
    </div>
  );
}
