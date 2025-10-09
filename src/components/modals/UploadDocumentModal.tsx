
"use client";

import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
  companyName?: string;
  employeeName?: string;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onFileUpload,
  companyName,
  employeeName,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  });

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
      setFile(null); // Reset after upload
    }
  };
  
  const handleClose = () => {
    setFile(null);
    onClose();
  };

  const targetDescription = () => {
    if (employeeName) return `para el empleado ${employeeName}`;
    if (companyName) return `para la empresa ${companyName}`;
    return `a tu perfil`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subir Documento</DialogTitle>
          <DialogDescription>
            Añade un nuevo documento {targetDescription()}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!file ? (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center w-full h-32 px-4 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600 hover:border-primary'}`}
            >
              <input {...getInputProps()} />
              <UploadCloud className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              {isDragActive ? (
                <p>Suelta el archivo aquí...</p>
              ) : (
                <p>Arrastra y suelta un archivo, o haz clic para seleccionar</p>
              )}
               <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, JPG, PNG (Max 5MB)</p>
            </div>
          ) : (
             <div className="flex items-center justify-between p-2 border rounded-md bg-muted">
                <div className="flex items-center gap-2">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="h-6 w-6">
                    <X className="h-4 w-4" />
                </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleUpload} disabled={!file}>
            Subir Archivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentModal;
