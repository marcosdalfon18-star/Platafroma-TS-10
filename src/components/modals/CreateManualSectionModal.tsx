/**
 * Modal para crear y editar secciones del Manual de Empresa
 */

"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save, X } from 'lucide-react';
import { ManualCategory, ManualSection } from '@/services/companyManual';

interface CreateManualSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    category: ManualCategory;
    title: string;
    content: string;
    order?: number;
  }) => Promise<void>;
  editingSection?: ManualSection | null;
  companyId: string;
}

const CATEGORY_OPTIONS: { value: ManualCategory; label: string; description: string }[] = [
  {
    value: 'vision-mision',
    label: '🎯 Visión y Misión',
    description: 'Propósito, visión y valores de la empresa'
  },
  {
    value: 'politicas',
    label: '📋 Políticas Corporativas',
    description: 'Políticas de recursos humanos y operativas'
  },
  {
    value: 'normas',
    label: '⚖️ Normas Internas',
    description: 'Reglas y normativas internas de la empresa'
  },
  {
    value: 'cultura',
    label: '🏛️ Cultura Empresarial',
    description: 'Valores, principios y cultura organizacional'
  },
  {
    value: 'procedimientos',
    label: '🔄 Procedimientos',
    description: 'Procesos y procedimientos operativos'
  },
  {
    value: 'codigo-conducta',
    label: '📜 Código de Conducta',
    description: 'Comportamientos esperados y ética empresarial'
  },
  {
    value: 'valores',
    label: '💎 Valores Corporativos',
    description: 'Principios y valores fundamentales'
  },
  {
    value: 'organigrama-funcional',
    label: '🏢 Organigrama Funcional',
    description: 'Estructura organizacional y funciones'
  }
];

const CreateManualSectionModal: React.FC<CreateManualSectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingSection,
  companyId
}) => {
  const [formData, setFormData] = useState({
    category: editingSection?.category || ('vision-mision' as ManualCategory),
    title: editingSection?.title || '',
    content: editingSection?.content || '',
    order: editingSection?.order || 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        category: formData.category,
        title: formData.title.trim(),
        content: formData.content.trim(),
        order: formData.order
      });
      
      // Reset form
      setFormData({
        category: 'vision-mision',
        title: '',
        content: '',
        order: 0
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving manual section:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        category: 'vision-mision',
        title: '',
        content: '',
        order: 0
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingSection ? 'Editar Sección' : 'Agregar Nueva Sección'}
          </DialogTitle>
          <DialogDescription>
            {editingSection 
              ? 'Modifica la información de esta sección del manual.'
              : 'Agrega una nueva sección al manual de la empresa.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={formData.category}
              onValueChange={(value: ManualCategory) => setFormData(prev => ({ ...prev, category: value }))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
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
              placeholder="Ej: Política de Vacaciones, Valores Corporativos..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              disabled={isLoading}
              required
            />
          </div>

          {/* Contenido */}
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              placeholder="Describe el contenido de esta sección del manual..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              disabled={isLoading}
              className="min-h-[200px] resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              Puedes usar markdown para formatear el contenido (negritas con **texto**, listas con -, etc.)
            </p>
          </div>

          {/* Orden */}
          <div className="space-y-2">
            <Label htmlFor="order">Orden de Aparición</Label>
            <Input
              id="order"
              type="number"
              placeholder="0"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              disabled={isLoading}
              min={0}
            />
            <p className="text-xs text-muted-foreground">
              Las secciones se ordenarán de menor a mayor número dentro de cada categoría
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              {editingSection ? 'Actualizar' : 'Crear'} Sección
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateManualSectionModal;