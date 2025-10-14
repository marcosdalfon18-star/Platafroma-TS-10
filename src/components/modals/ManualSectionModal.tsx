import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { ManualSection, ManualCategory, MANUAL_CATEGORIES } from '@/services/companyManual';

interface ManualSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    content: string;
    category: ManualCategory;
  }) => Promise<void>;
  section?: ManualSection | null;
  companyName?: string;
  loading?: boolean;
}

export default function ManualSectionModal({
  isOpen,
  onClose,
  onSave,
  section,
  companyName,
  loading = false
}: ManualSectionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'vision-mision' as ManualCategory
  });

  // Poblar formulario cuando se edita una sección existente
  useEffect(() => {
    if (section) {
      setFormData({
        title: section.title,
        content: section.content,
        category: section.category
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: 'vision-mision'
      });
    }
  }, [section, isOpen]);

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      // Error ya manejado en el hook
      console.error('Error saving section:', error);
    }
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const isEditing = !!section;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Sección' : 'Nueva Sección del Manual'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? `Modifica la sección "${section?.title}" del manual${companyName ? ` de ${companyName}` : ''}.`
              : `Crea una nueva sección para el manual${companyName ? ` de ${companyName}` : ''}.`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={formData.category}
              onValueChange={(value: ManualCategory) => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MANUAL_CATEGORIES).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{category.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {category.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Sección</Label>
            <Input
              id="title"
              placeholder="Ej: Nuestra Visión Corporativa"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                title: e.target.value 
              }))}
              disabled={loading}
            />
          </div>

          {/* Contenido */}
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              placeholder="Describe el contenido de esta sección del manual..."
              value={formData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="min-h-[200px] resize-none"
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Puedes usar texto plano. En el futuro se agregará soporte para formato enriquecido.
            </p>
          </div>

          {/* Vista previa de la categoría seleccionada */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{MANUAL_CATEGORIES[formData.category].icon}</span>
              <span className="font-medium text-sm">
                {MANUAL_CATEGORIES[formData.category].label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {MANUAL_CATEGORIES[formData.category].description}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={loading || !formData.title.trim() || !formData.content.trim()}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Actualizar' : 'Crear'} Sección
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}