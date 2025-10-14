'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getJobAnnouncement } from '@/app/actions';
import { Loader2, Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type JobPosition = {
    title: string;
    description?: string;
};

interface GenerateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: JobPosition | null;
}

const GenerateAdModal: React.FC<GenerateAdModalProps> = ({ isOpen, onClose, position }) => {
  const [announcement, setAnnouncement] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && position) {
      const fetchAnnouncement = async () => {
        setIsLoading(true);
        setError(null);
        setAnnouncement('');
        try {
          const result = await getJobAnnouncement({
            title: position.title,
            description: position.description || 'Posición disponible en nuestra empresa',
            requirements: [],
            department: 'General',
            location: 'No especificado',
            experienceLevel: 'Medio',
            employmentType: 'Tiempo completo'
          });
          setAnnouncement(result);
        } catch {
          setError('No se pudo generar el anuncio. Por favor, inténtalo de nuevo.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchAnnouncement();
    }
  }, [isOpen, position]);

  const handleCopy = () => {
    navigator.clipboard.writeText(announcement);
    setHasCopied(true);
    toast({
        title: "¡Copiado!",
        description: "El texto del anuncio se ha copiado al portapapeles.",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Anuncio Generado por IA</DialogTitle>
          <DialogDescription>
            Este es un borrador generado para el puesto de &quot;{position?.title}&quot;. Puedes copiarlo y ajustarlo.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 max-h-[60vh] overflow-y-auto p-4 border rounded-md bg-muted/50 relative">
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Generando anuncio...</p>
                </div>
            )}
            {error && <p className="text-destructive text-center">{error}</p>}
            {announcement && (
                <pre className="whitespace-pre-wrap text-sm font-sans">{announcement}</pre>
            )}
        </div>
        <DialogFooter className="sm:justify-between gap-2">
            <Button variant="outline" onClick={onClose}>Cerrar</Button>
            <Button onClick={handleCopy} disabled={!announcement || isLoading}>
                {hasCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {hasCopied ? 'Copiado' : 'Copiar Texto'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateAdModal;
