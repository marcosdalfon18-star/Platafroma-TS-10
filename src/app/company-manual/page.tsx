"use client";

import React, { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Info, 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  BookOpen,
  FileText,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCompanyManual } from '@/hooks/useCompanyManual';
import { useAuth } from '@/contexts/AuthContext';
import { ManualCategory, ManualSection } from '@/services/companyManual';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import CreateManualSectionModal from '@/components/modals/CreateManualSectionModal';
import { useToast } from '@/hooks/use-toast';

const CATEGORY_LABELS: Record<ManualCategory, string> = {
  'vision-mision': 'Misión, Visión y Valores',
  'politicas': 'Políticas Empresariales',
  'normas': 'Normas y Reglamentos',
  'cultura': 'Cultura Corporativa',
  'procedimientos': 'Procedimientos Operativos',
  'codigo-conducta': 'Código de Conducta',
  'valores': 'Valores Corporativos',
  'organigrama-funcional': 'Organigrama Funcional'
};

const CATEGORY_COLORS: Record<ManualCategory, string> = {
  'vision-mision': 'bg-blue-100 text-blue-800',
  'politicas': 'bg-green-100 text-green-800',
  'normas': 'bg-yellow-100 text-yellow-800',
  'cultura': 'bg-purple-100 text-purple-800',
  'procedimientos': 'bg-orange-100 text-orange-800',
  'codigo-conducta': 'bg-red-100 text-red-800',
  'valores': 'bg-pink-100 text-pink-800',
  'organigrama-funcional': 'bg-gray-100 text-gray-800'
};

function CompanyManualContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSection, setEditingSection] = useState<ManualSection | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ManualCategory | 'all'>('all');
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Definir permisos basados en roles
  const permissions = {
    canCreate: user?.role === 'consultor',
    canEdit: user?.role === 'consultor' || user?.role === 'empresario',
    canDelete: user?.role === 'consultor',
    canManageCategories: user?.role === 'consultor',
    canView: true, // Todos pueden ver
    isReadOnly: user?.role === 'empleado' || user?.role === 'gestor'
  };
  
  // Por ahora usaremos una empresa de ejemplo, en el futuro se obtendrá del contexto
  const companyId = user?.companyId || 'default-company';
  const { 
    sections, 
    loading, 
    addSection, 
    updateSection, 
    removeSection 
  } = useCompanyManual({ companyId });

  const filteredSections = useMemo(() => {
    let filtered = sections;
    
    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(section => section.category === selectedCategory);
    }
    
    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [sections, searchTerm, selectedCategory]);

  const groupedSections = useMemo(() => {
    const grouped: Record<ManualCategory, ManualSection[]> = {} as Record<ManualCategory, ManualSection[]>;
    
    filteredSections.forEach(section => {
      if (!grouped[section.category]) {
        grouped[section.category] = [];
      }
      grouped[section.category].push(section);
    });
    
    // Ordenar secciones dentro de cada categoría
    Object.keys(grouped).forEach(category => {
      grouped[category as ManualCategory].sort((a, b) => a.order - b.order);
    });
    
    return grouped;
  }, [filteredSections]);

  const handleCreateSection = async (data: {
    category: ManualCategory;
    title: string;
    content: string;
    order?: number;
  }) => {
    if (!permissions.canCreate) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo las Consultoras pueden crear nuevas secciones en el manual",
        variant: "destructive"
      });
      return;
    }
    await addSection({
      companyId,
      category: data.category,
      title: data.title,
      content: data.content,
      order: data.order || 0
    });
  };

  const handleEditSection = (section: ManualSection) => {
    if (!permissions.canEdit) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo Consultoras y Empresarios pueden editar el manual",
        variant: "destructive"
      });
      return;
    }
    setEditingSection(section);
    setShowCreateModal(true);
  };

  const handleUpdateSection = async (data: {
    category: ManualCategory;
    title: string;
    content: string;
    order?: number;
  }) => {
    if (!editingSection) return;
    
    if (!permissions.canEdit) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo Consultoras y Empresarios pueden editar el manual",
        variant: "destructive"
      });
      return;
    }
    
    await updateSection(editingSection.id, {
      category: data.category,
      title: data.title,
      content: data.content,
      order: data.order || 0
    });
    
    setEditingSection(null);
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!permissions.canDelete) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo las Consultoras pueden eliminar secciones del manual",
        variant: "destructive"
      });
      return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar esta sección?')) {
      await removeSection(sectionId);
    }
  };

  const getCategoryCount = (category: ManualCategory) => {
    return sections.filter(s => s.category === category).length;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {user?.role === 'consultor' ? 'Manual de Empresa - Configuración' : 
             user?.role === 'empresario' ? 'Manual de Empresa' : 
             'Consultar Manual de Empresa'}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'consultor' ? 'Crea y gestiona el contenido del manual empresarial' :
             user?.role === 'empresario' ? 'Encuentra información sobre políticas, cultura y procedimientos' :
             'Consulta información sobre las políticas y cultura de la compañía'}
          </p>
          
          {/* Indicador de rol y permisos */}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={user?.role === 'consultor' ? 'default' : 'secondary'}>
              {user?.role === 'consultor' ? '👩‍💼 Consultora - Gestión Completa' :
               user?.role === 'empresario' ? '🏢 Empresario - Edición Permitida' :
               user?.role === 'empleado' ? '👨‍💻 Empleado - Solo Consulta' : 
               user?.role === 'gestor' ? '👔 Gestor - Solo Consulta' : 'Usuario'}
            </Badge>
            {permissions.isReadOnly && (
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                👁️ Solo Lectura
              </Badge>
            )}
          </div>
        </div>
        {permissions.canCreate && (
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Sección
          </Button>
        )}
      </header>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar en el manual..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ManualCategory | 'all')}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="all">Todas</TabsTrigger>
            {Object.entries(CATEGORY_LABELS).slice(0, 7).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="hidden sm:flex">
                {label.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : sections.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Manual Vacío</h3>
            <p className="text-muted-foreground mb-4">
              {permissions.canCreate 
                ? 'Comienza agregando la primera sección del manual de empresa.'
                : permissions.canEdit
                ? 'El manual está siendo preparado por la consultora. Podrás editarlo una vez que esté listo.'
                : 'El manual de empresa está siendo preparado.'
              }
            </p>
            {permissions.canCreate && (
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Primera Sección
              </Button>
            )}
          </CardContent>
        </Card>
      ) : filteredSections.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No se encontraron secciones para "<strong>{searchTerm}</strong>"
              {selectedCategory !== 'all' && ` en la categoría "${CATEGORY_LABELS[selectedCategory]}"`}.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {Object.entries(groupedSections).map(([category, categorySections]) => (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">
                      {CATEGORY_LABELS[category as ManualCategory]}
                    </CardTitle>
                    <Badge variant="secondary" className={CATEGORY_COLORS[category as ManualCategory]}>
                      {categorySections.length} {categorySections.length === 1 ? 'sección' : 'secciones'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {categorySections.map((section) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center justify-between w-full mr-4">
                          <span className="font-semibold">{section.title}</span>
                          {(permissions.canEdit || permissions.canDelete) && (
                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                              {permissions.canEdit && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditSection(section)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              )}
                              {permissions.canDelete && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteSection(section.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal para crear/editar sección */}
      <CreateManualSectionModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingSection(null);
        }}
        onSave={editingSection ? handleUpdateSection : handleCreateSection}
        editingSection={editingSection}
        companyId={companyId}
      />
    </div>
  );
}

export default function CompanyManualPage() {
  return (
    <ProtectedRoute>
      <CompanyManualContent />
    </ProtectedRoute>
  );
}
