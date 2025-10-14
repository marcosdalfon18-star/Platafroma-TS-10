import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/firebase';

export interface ManualSection {
  id: string;
  companyId: string;
  category: ManualCategory;
  title: string;
  content: string;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // userId del consultor
}

export type ManualCategory = 
  | 'vision-mision' 
  | 'politicas' 
  | 'normas' 
  | 'cultura' 
  | 'procedimientos' 
  | 'codigo-conducta'
  | 'valores'
  | 'organigrama-funcional';

export interface CreateManualSectionData {
  companyId: string;
  category: ManualCategory;
  title: string;
  content: string;
  order?: number;
}

const COLLECTION_NAME = 'companyManualSections';

// Obtener todas las secciones de una empresa
export const getCompanyManualSections = async (companyId: string): Promise<ManualSection[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('companyId', '==', companyId),
      orderBy('category'),
      orderBy('order')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ManualSection[];
  } catch (error) {
    console.error('Error fetching company manual sections:', error);
    throw error;
  }
};

// Obtener secciones por categoría
export const getManualSectionsByCategory = async (
  companyId: string, 
  category: ManualCategory
): Promise<ManualSection[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('companyId', '==', companyId),
      where('category', '==', category),
      orderBy('order')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ManualSection[];
  } catch (error) {
    console.error('Error fetching manual sections by category:', error);
    throw error;
  }
};

// Crear nueva sección del manual
export const createManualSection = async (
  data: CreateManualSectionData, 
  userId: string
): Promise<string> => {
  try {
    // Obtener el próximo número de orden si no se especifica
    let order = data.order;
    if (order === undefined) {
      const existingSections = await getManualSectionsByCategory(data.companyId, data.category);
      order = existingSections.length + 1;
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdBy: userId
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating manual section:', error);
    throw error;
  }
};

// Actualizar sección existente
export const updateManualSection = async (
  sectionId: string, 
  updates: Partial<Pick<ManualSection, 'title' | 'content' | 'category' | 'order'>>
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, sectionId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating manual section:', error);
    throw error;
  }
};

// Eliminar sección
export const deleteManualSection = async (sectionId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, sectionId));
  } catch (error) {
    console.error('Error deleting manual section:', error);
    throw error;
  }
};

// Reordenar secciones dentro de una categoría
export const reorderManualSections = async (
  companyId: string,
  category: ManualCategory,
  sectionIds: string[]
): Promise<void> => {
  try {
    const updatePromises = sectionIds.map((sectionId, index) => 
      updateDoc(doc(db, COLLECTION_NAME, sectionId), {
        order: index + 1,
        updatedAt: Timestamp.now()
      })
    );
    
    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error reordering manual sections:', error);
    throw error;
  }
};

// Categorías disponibles con sus metadatos
export const MANUAL_CATEGORIES = {
  'vision-mision': {
    label: 'Visión y Misión',
    description: 'Declaración de la visión, misión y propósito de la empresa',
    icon: '🎯'
  },
  'valores': {
    label: 'Valores Corporativos',
    description: 'Principios y valores que guían a la organización',
    icon: '⭐'
  },
  'politicas': {
    label: 'Políticas Corporativas',
    description: 'Políticas generales de la empresa por departamento',
    icon: '📋'
  },
  'normas': {
    label: 'Normas Internas',
    description: 'Reglamentos internos y normas de trabajo',
    icon: '📜'
  },
  'codigo-conducta': {
    label: 'Código de Conducta',
    description: 'Estándares de comportamiento y ética empresarial',
    icon: '⚖️'
  },
  'cultura': {
    label: 'Cultura Empresarial',
    description: 'Ambiente de trabajo, tradiciones y filosofía corporativa',
    icon: '🏛️'
  },
  'procedimientos': {
    label: 'Procedimientos Operativos',
    description: 'Procesos y procedimientos estándar de trabajo',
    icon: '🔄'
  },
  'organigrama-funcional': {
    label: 'Estructura Organizacional',
    description: 'Organigrama funcional y descripción de roles',
    icon: '🏢'
  }
} as const;