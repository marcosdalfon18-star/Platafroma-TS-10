/**
 * Servicio para gestionar puestos de trabajo en Firestore
 */

import { where, orderBy, Timestamp } from 'firebase/firestore';
import { 
  JobPosition, 
  COLLECTIONS, 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  getDocumentsByQuery, 
  getDocumentById 
} from '@/lib/firestore';

export interface CreateJobPositionInput {
  title: string;
  department: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  location?: string;
  type: "tiempo_completo" | "medio_tiempo" | "contrato" | "practicas";
  companyId: string;
  createdBy: string;
}

export interface UpdateJobPositionInput {
  title?: string;
  department?: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  location?: string;
  type?: "tiempo_completo" | "medio_tiempo" | "contrato" | "practicas";
  status?: "activo" | "borrador" | "archivado";
  processStatus?: "no_iniciado" | "activo" | "cerrado";
}

/**
 * Crear un nuevo puesto de trabajo
 */
export const createJobPosition = async (data: CreateJobPositionInput): Promise<string> => {
  const jobPosition = {
    ...data,
    requirements: data.requirements || [],
    responsibilities: data.responsibilities || [],
    status: "borrador" as const,
    processStatus: "no_iniciado" as const,
  };

  const docRef = await createDocument('JOB_POSITIONS', jobPosition);
  return docRef.id;
};

/**
 * Actualizar un puesto de trabajo
 */
export const updateJobPosition = async (
  id: string, 
  data: UpdateJobPositionInput
): Promise<void> => {
  await updateDocument('JOB_POSITIONS', id, data);
};

/**
 * Eliminar un puesto de trabajo
 */
export const deleteJobPosition = async (id: string): Promise<void> => {
  await deleteDocument('JOB_POSITIONS', id);
};

/**
 * Obtener puesto de trabajo por ID
 */
export const getJobPositionById = async (id: string): Promise<JobPosition | null> => {
  return await getDocumentById('JOB_POSITIONS', id) as JobPosition | null;
};

/**
 * Obtener todos los puestos de trabajo de una empresa
 */
export const getJobPositionsByCompany = async (companyId: string): Promise<JobPosition[]> => {
  return await getDocumentsByQuery('JOB_POSITIONS', [
    where('companyId', '==', companyId),
    orderBy('createdAt', 'desc')
  ]) as JobPosition[];
};

/**
 * Obtener puestos de trabajo por estado
 */
export const getJobPositionsByStatus = async (
  companyId: string, 
  status: "activo" | "borrador" | "archivado"
): Promise<JobPosition[]> => {
  return await getDocumentsByQuery('JOB_POSITIONS', [
    where('companyId', '==', companyId),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  ]) as JobPosition[];
};

/**
 * Obtener puestos de trabajo activos para procesos de selección
 */
export const getActiveJobPositionsForSelection = async (companyId: string): Promise<JobPosition[]> => {
  return await getDocumentsByQuery('JOB_POSITIONS', [
    where('companyId', '==', companyId),
    where('status', '==', 'activo'),
    orderBy('createdAt', 'desc')
  ]) as JobPosition[];
};

/**
 * Cambiar estado de un puesto de trabajo
 */
export const changeJobPositionStatus = async (
  id: string, 
  status: "activo" | "borrador" | "archivado"
): Promise<void> => {
  await updateJobPosition(id, { status });
};

/**
 * Cambiar estado del proceso de selección
 */
export const changeProcessStatus = async (
  id: string, 
  processStatus: "no_iniciado" | "activo" | "cerrado"
): Promise<void> => {
  await updateJobPosition(id, { processStatus });
};