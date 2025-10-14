import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ManualSection, 
  ManualCategory, 
  CreateManualSectionData,
  getCompanyManualSections,
  getManualSectionsByCategory,
  createManualSection,
  updateManualSection,
  deleteManualSection,
  reorderManualSections
} from '@/services/companyManual';
import { useToast } from '@/hooks/use-toast';

interface UseCompanyManualProps {
  companyId?: string;
  category?: ManualCategory;
}

export const useCompanyManual = ({ companyId, category }: UseCompanyManualProps = {}) => {
  const [sections, setSections] = useState<ManualSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Cargar secciones
  const loadSections = async () => {
    if (!companyId) return;
    
    setLoading(true);
    try {
      let sectionsData: ManualSection[];
      
      if (category) {
        sectionsData = await getManualSectionsByCategory(companyId, category);
      } else {
        sectionsData = await getCompanyManualSections(companyId);
      }
      
      setSections(sectionsData);
    } catch (error) {
      console.error('Error loading manual sections:', error);
      toast({
        title: "Error al cargar el manual",
        description: "No se pudieron cargar las secciones del manual.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva sección
  const addSection = async (data: CreateManualSectionData) => {
    if (!user) {
      toast({
        title: "Error de autenticación",
        description: "Debes estar autenticado para crear secciones.",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);
    try {
      const sectionId = await createManualSection(data, user.uid);
      
      // Recargar las secciones para mostrar la nueva
      await loadSections();
      
      toast({
        title: "Sección creada",
        description: "La sección del manual se ha creado exitosamente.",
      });
      
      return sectionId;
    } catch (error) {
      console.error('Error creating manual section:', error);
      toast({
        title: "Error al crear sección",
        description: "No se pudo crear la sección del manual.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setCreating(false);
    }
  };

  // Actualizar sección existente
  const updateSection = async (
    sectionId: string, 
    updates: Partial<Pick<ManualSection, 'title' | 'content' | 'category' | 'order'>>
  ) => {
    setUpdating(sectionId);
    try {
      await updateManualSection(sectionId, updates);
      
      // Actualizar la sección localmente
      setSections(prev => 
        prev.map(section => 
          section.id === sectionId 
            ? { ...section, ...updates }
            : section
        )
      );
      
      toast({
        title: "Sección actualizada",
        description: "La sección del manual se ha actualizado exitosamente.",
      });
    } catch (error) {
      console.error('Error updating manual section:', error);
      toast({
        title: "Error al actualizar sección",
        description: "No se pudo actualizar la sección del manual.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setUpdating(null);
    }
  };

  // Eliminar sección
  const removeSection = async (sectionId: string) => {
    setDeleting(sectionId);
    try {
      await deleteManualSection(sectionId);
      
      // Remover la sección localmente
      setSections(prev => prev.filter(section => section.id !== sectionId));
      
      toast({
        title: "Sección eliminada",
        description: "La sección del manual se ha eliminado exitosamente.",
      });
    } catch (error) {
      console.error('Error deleting manual section:', error);
      toast({
        title: "Error al eliminar sección",
        description: "No se pudo eliminar la sección del manual.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setDeleting(null);
    }
  };

  // Reordenar secciones
  const reorderSections = async (sectionIds: string[]) => {
    if (!companyId || !category) return;
    
    try {
      await reorderManualSections(companyId, category, sectionIds);
      
      // Reordenar localmente
      const reorderedSections = sectionIds.map((id, index) => {
        const section = sections.find(s => s.id === id);
        return section ? { ...section, order: index + 1 } : null;
      }).filter(Boolean) as ManualSection[];
      
      setSections(reorderedSections);
      
      toast({
        title: "Orden actualizado",
        description: "El orden de las secciones se ha actualizado exitosamente.",
      });
    } catch (error) {
      console.error('Error reordering sections:', error);
      toast({
        title: "Error al reordenar",
        description: "No se pudo actualizar el orden de las secciones.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Cargar secciones al montar el componente o cambiar parámetros
  useEffect(() => {
    if (companyId) {
      loadSections();
    }
  }, [companyId, category]);

  // Obtener secciones agrupadas por categoría
  const sectionsByCategory = sections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<ManualCategory, ManualSection[]>);

  return {
    // Estado
    sections,
    sectionsByCategory,
    loading,
    creating,
    updating,
    deleting,
    
    // Acciones
    loadSections,
    addSection,
    updateSection,
    removeSection,
    reorderSections,
    
    // Utilidades
    canEdit: user?.role === 'consultor' || user?.role === 'empresario',
    canCreate: user?.role === 'consultor' || user?.role === 'empresario',
    canDelete: user?.role === 'consultor'
  };
};