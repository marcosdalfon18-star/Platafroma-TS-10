/**
 * Esquemas de Firestore para la aplicación TS Plataforma
 * 
 * Este archivo define la estructura de datos que se almacenará en Firestore
 * y proporciona utilidades para trabajar con las colecciones.
 */

import {
  collection,
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query,
  Timestamp,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/firebase';

// Export Timestamp for use in other modules
export { Timestamp };

// ===== TIPOS DE DATOS =====

export type UserRole = "consultor" | "empresario" | "empleado" | "gestor" | "ejecutivo";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  companyId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  ownerId: string; // uid del empresario que creó la empresa
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Employee {
  id: string;
  userId: string; // referencia al uid del usuario
  companyId: string;
  name: string;
  email: string;
  position: string;
  department: string;
  phone?: string;
  address?: string;
  salary?: number;
  startDate: Timestamp;
  endDate?: Timestamp;
  status: "activo" | "inactivo" | "baja";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface JobPosition {
  id: string;
  companyId: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  location?: string;
  type: "tiempo_completo" | "medio_tiempo" | "contrato" | "practicas";
  status: "activo" | "borrador" | "archivado";
  processStatus: "no_iniciado" | "activo" | "cerrado";
  createdBy: string; // uid del usuario que lo creó
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SelectionProcess {
  id: string;
  jobPositionId: string;
  companyId: string;
  title: string;
  status: "activo" | "cerrado" | "pausado";
  stages: ProcessStage[];
  candidates: Candidate[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProcessStage {
  id: string;
  name: string;
  description?: string;
  order: number;
  type: "cv_review" | "phone_interview" | "technical_test" | "face_interview" | "final_interview";
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cvUrl?: string;
  currentStage: string; // id del stage
  status: "pending" | "approved" | "rejected";
  notes?: string;
  appliedAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Payroll {
  id: string;
  employeeId: string;
  companyId: string;
  period: {
    month: number;
    year: number;
  };
  baseSalary: number;
  bonuses: PayrollItem[];
  deductions: PayrollItem[];
  totalGross: number;
  totalNet: number;
  status: "draft" | "approved" | "paid";
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PayrollItem {
  concept: string;
  amount: number;
  type: "bonus" | "deduction";
}

export interface Attendance {
  id: string;
  employeeId: string;
  companyId: string;
  date: Timestamp;
  checkIn?: Timestamp;
  checkOut?: Timestamp;
  breakStart?: Timestamp;
  breakEnd?: Timestamp;
  totalHours?: number;
  status: "present" | "absent" | "late" | "half_day" | "holiday";
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  companyId?: string;
  employeeId?: string;
  category: "contract" | "certificate" | "policy" | "manual" | "other";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ===== NOMBRES DE COLECCIONES =====
export const COLLECTIONS = {
  USERS: 'users',
  COMPANIES: 'companies',
  EMPLOYEES: 'employees',
  JOB_POSITIONS: 'jobPositions',
  SELECTION_PROCESSES: 'selectionProcesses',
  PAYROLLS: 'payrolls',
  ATTENDANCES: 'attendances',
  DOCUMENTS: 'documents',
} as const;

// ===== UTILIDADES DE FIRESTORE =====

/**
 * Obtener referencia a una colección
 */
export const getCollectionRef = (collectionName: keyof typeof COLLECTIONS) => {
  return collection(db, COLLECTIONS[collectionName]);
};

/**
 * Obtener referencia a un documento
 */
export const getDocRef = (collectionName: keyof typeof COLLECTIONS, docId: string) => {
  return doc(db, COLLECTIONS[collectionName], docId);
};

/**
 * Crear un documento con timestamp automático
 */
export const createDocument = async (
  collectionName: keyof typeof COLLECTIONS, 
  data: Record<string, unknown>
) => {
  const now = Timestamp.now();
  return await addDoc(getCollectionRef(collectionName), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
};

/**
 * Actualizar un documento con timestamp automático
 */
export const updateDocument = async (
  collectionName: keyof typeof COLLECTIONS, 
  docId: string, 
  data: Record<string, unknown>
) => {
  return await updateDoc(getDocRef(collectionName, docId), {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

/**
 * Eliminar un documento
 */
export const deleteDocument = async (
  collectionName: keyof typeof COLLECTIONS, 
  docId: string
) => {
  return await deleteDoc(getDocRef(collectionName, docId));
};

/**
 * Obtener todos los documentos de una colección
 */
export const getAllDocuments = async (collectionName: keyof typeof COLLECTIONS) => {
  const querySnapshot = await getDocs(getCollectionRef(collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Obtener documentos por consulta
 */
export const getDocumentsByQuery = async (
  collectionName: keyof typeof COLLECTIONS,
  constraints: QueryConstraint[]
) => {
  const q = query(getCollectionRef(collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Obtener un documento por ID
 */
export const getDocumentById = async (
  collectionName: keyof typeof COLLECTIONS, 
  docId: string
) => {
  const docSnap = await getDoc(getDocRef(collectionName, docId));
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
  return null;
};