/**
 * Servicio para gestionar empleados en Firestore
 */

import { where, orderBy, Timestamp } from 'firebase/firestore';
import { 
  Employee, 
  COLLECTIONS, 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  getDocumentsByQuery, 
  getDocumentById 
} from '@/lib/firestore';

export interface CreateEmployeeInput {
  userId: string;
  companyId: string;
  name: string;
  email: string;
  position: string;
  department: string;
  phone?: string;
  address?: string;
  salary?: number;
  startDate: Date;
}

export interface UpdateEmployeeInput {
  name?: string;
  email?: string;
  position?: string;
  department?: string;
  phone?: string;
  address?: string;
  salary?: number;
  startDate?: Date;
  endDate?: Date;
  status?: "activo" | "inactivo" | "baja";
}

/**
 * Crear un nuevo empleado
 */
export const createEmployee = async (data: CreateEmployeeInput): Promise<string> => {
  const employee = {
    ...data,
    startDate: Timestamp.fromDate(data.startDate),
    status: "activo" as const,
  };

  const docRef = await createDocument('EMPLOYEES', employee);
  return docRef.id;
};

/**
 * Actualizar un empleado
 */
export const updateEmployee = async (
  id: string, 
  data: UpdateEmployeeInput
): Promise<void> => {
  const updateData: any = { ...data };
  
  // Convertir fechas a Timestamp si existen
  if (data.startDate) {
    updateData.startDate = Timestamp.fromDate(data.startDate);
  }
  if (data.endDate) {
    updateData.endDate = Timestamp.fromDate(data.endDate);
  }

  await updateDocument('EMPLOYEES', id, updateData);
};

/**
 * Eliminar un empleado (soft delete)
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  await updateEmployee(id, { 
    status: "baja",
    endDate: new Date()
  });
};

/**
 * Eliminar empleado permanentemente
 */
export const permanentDeleteEmployee = async (id: string): Promise<void> => {
  await deleteDocument('EMPLOYEES', id);
};

/**
 * Obtener empleado por ID
 */
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  return await getDocumentById('EMPLOYEES', id) as Employee | null;
};

/**
 * Obtener empleado por userId
 */
export const getEmployeeByUserId = async (userId: string): Promise<Employee | null> => {
  const employees = await getDocumentsByQuery('EMPLOYEES', [
    where('userId', '==', userId),
    where('status', '==', 'activo')
  ]) as Employee[];

  return employees.length > 0 ? employees[0] : null;
};

/**
 * Obtener todos los empleados de una empresa
 */
export const getEmployeesByCompany = async (companyId: string): Promise<Employee[]> => {
  return await getDocumentsByQuery('EMPLOYEES', [
    where('companyId', '==', companyId),
    orderBy('createdAt', 'desc')
  ]) as Employee[];
};

/**
 * Obtener empleados activos de una empresa
 */
export const getActiveEmployeesByCompany = async (companyId: string): Promise<Employee[]> => {
  return await getDocumentsByQuery('EMPLOYEES', [
    where('companyId', '==', companyId),
    where('status', '==', 'activo'),
    orderBy('name', 'asc')
  ]) as Employee[];
};

/**
 * Obtener empleados por departamento
 */
export const getEmployeesByDepartment = async (
  companyId: string, 
  department: string
): Promise<Employee[]> => {
  return await getDocumentsByQuery('EMPLOYEES', [
    where('companyId', '==', companyId),
    where('department', '==', department),
    where('status', '==', 'activo'),
    orderBy('name', 'asc')
  ]) as Employee[];
};

/**
 * Obtener estadísticas de empleados
 */
export const getEmployeeStats = async (companyId: string) => {
  const allEmployees = await getEmployeesByCompany(companyId);
  
  const stats = {
    total: allEmployees.length,
    activos: allEmployees.filter(emp => emp.status === 'activo').length,
    inactivos: allEmployees.filter(emp => emp.status === 'inactivo').length,
    bajas: allEmployees.filter(emp => emp.status === 'baja').length,
    porDepartamento: {} as Record<string, number>
  };

  // Contar por departamento
  allEmployees.forEach(emp => {
    if (emp.status === 'activo') {
      stats.porDepartamento[emp.department] = (stats.porDepartamento[emp.department] || 0) + 1;
    }
  });

  return stats;
};