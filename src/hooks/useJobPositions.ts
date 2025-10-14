/**
 * Hook personalizado para gestionar puestos de trabajo con Firestore
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/stores/appStore';
import {
  getJobPositionsByCompany,
  createJobPosition,
  updateJobPosition as updateJobPositionService,
  deleteJobPosition as deleteJobPositionService,
  changeJobPositionStatus,
  changeProcessStatus,
  CreateJobPositionInput,
  UpdateJobPositionInput,
} from '@/services/jobPositions';
import { JobPosition as FirestoreJobPosition } from '@/lib/firestore';
import { useToast } from '@/hooks/use-toast';

// Mapear el tipo de Firestore al tipo del store
const mapFirestoreToStore = (firestoreJob: FirestoreJobPosition): any => ({
  id: parseInt(firestoreJob.id) || Date.now(), // Convertir string id a number para compatibilidad
  title: firestoreJob.title,
  department: firestoreJob.department,
  description: firestoreJob.description,
  status: firestoreJob.status === 'activo' ? 'Activo' : 
          firestoreJob.status === 'borrador' ? 'Borrador' : 'Archivado',
  processStatus: firestoreJob.processStatus === 'no_iniciado' ? 'No Iniciado' :
                 firestoreJob.processStatus === 'activo' ? 'Activo' : 'Cerrado',
});

export const useJobPositions = () => {
  const { user } = useAuth();
  const { jobPositions, setJobPositions, addJobPosition, updateJobPosition, deleteJobPosition } = useAppStore();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Obtener la companyId del usuario (esto debería venir del contexto o perfil)
  const companyId = user?.companyId || 'default-company'; // Temporal

  // Cargar puestos de trabajo desde Firestore
  const loadJobPositions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const firestorePositions = await getJobPositionsByCompany(companyId);
      const storePositions = firestorePositions.map(mapFirestoreToStore);
      setJobPositions(storePositions);
    } catch (error) {
      console.error('Error loading job positions:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los puestos de trabajo",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo puesto
  const createNewJobPosition = async (data: Omit<CreateJobPositionInput, 'companyId' | 'createdBy'>) => {
    if (!user) return;

    setLoading(true);
    try {
      const firestoreId = await createJobPosition({
        ...data,
        companyId,
        createdBy: user.uid,
      });

      // Agregar al store local
      addJobPosition({
        ...data,
        status: 'Borrador',
        processStatus: 'No Iniciado',
      });

      toast({
        title: "Éxito",
        description: "Puesto de trabajo creado correctamente"
      });

      return firestoreId;
    } catch (error) {
      console.error('Error creating job position:', error);
      toast({
        title: "Error",
        description: "No se pudo crear el puesto de trabajo",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar puesto
  const updateExistingJobPosition = async (id: number, data: UpdateJobPositionInput) => {
    setLoading(true);
    try {
      // Actualizar en Firestore
      await updateJobPositionService(id.toString(), data);

      // Mapear estados para el store local
      const mappedData: any = { ...data };
      if (data.status) {
        mappedData.status = data.status === 'activo' ? 'Activo' : 
                           data.status === 'borrador' ? 'Borrador' : 'Archivado';
      }
      if (data.processStatus) {
        mappedData.processStatus = data.processStatus === 'no_iniciado' ? 'No Iniciado' :
                                  data.processStatus === 'activo' ? 'Activo' : 'Cerrado';
      }

      // Actualizar en store local
      updateJobPosition(id, mappedData);

      toast({
        title: "Éxito",
        description: "Puesto de trabajo actualizado correctamente"
      });
    } catch (error) {
      console.error('Error updating job position:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el puesto de trabajo",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar puesto
  const removeJobPosition = async (id: number) => {
    setLoading(true);
    try {
      await deleteJobPositionService(id.toString());
      deleteJobPosition(id);

      toast({
        title: "Éxito",
        description: "Puesto de trabajo eliminado correctamente"
      });
    } catch (error) {
      console.error('Error deleting job position:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el puesto de trabajo",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado del puesto
  const changeStatus = async (id: number, status: 'activo' | 'borrador' | 'archivado') => {
    try {
      await changeJobPositionStatus(id.toString(), status);
      await updateExistingJobPosition(id, { status });
    } catch (error) {
      throw error;
    }
  };

  // Cambiar estado del proceso
  const changeProcess = async (id: number, processStatus: 'no_iniciado' | 'activo' | 'cerrado') => {
    try {
      await changeProcessStatus(id.toString(), processStatus);
      await updateExistingJobPosition(id, { processStatus });
    } catch (error) {
      throw error;
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    if (user && jobPositions.length === 0) {
      loadJobPositions();
    }
  }, [user]);

  return {
    jobPositions,
    loading,
    loadJobPositions,
    createJobPosition: createNewJobPosition,
    updateJobPosition: updateExistingJobPosition,
    deleteJobPosition: removeJobPosition,
    changeStatus,
    changeProcess,
  };
};