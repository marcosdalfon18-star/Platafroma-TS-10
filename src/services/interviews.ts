/**
 * Servicio para gestión de entrevistas
 */

import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/firebase';

// Tipos para el sistema de entrevistas
export interface Candidate {
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  cv?: string;
  notes?: string;
  createdAt: Date;
}

export interface InterviewEvaluation {
  criteria: string;
  score: number; // 1-5
  comments?: string;
}

export interface Interview {
  id?: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  date: Date;
  time: string;
  duration: number; // minutes
  location: string;
  interviewerName: string;
  interviewerEmail: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  type: 'technical' | 'hr' | 'cultural' | 'final';
  evaluations?: InterviewEvaluation[];
  finalScore?: number;
  decision?: 'approved' | 'rejected' | 'pending';
  notes?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type InterviewStatus = Interview['status'];
export type InterviewType = Interview['type'];

const INTERVIEWS_COLLECTION = 'interviews';
const CANDIDATES_COLLECTION = 'candidates';

// Servicio de Candidatos
export const candidatesService = {
  async create(candidate: Omit<Candidate, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, CANDIDATES_COLLECTION), {
        ...candidate,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating candidate:', error);
      throw new Error('Error al crear candidato');
    }
  },

  async getAll(companyId: string): Promise<Candidate[]> {
    try {
      const q = query(
        collection(db, CANDIDATES_COLLECTION),
        where('companyId', '==', companyId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Candidate[];
    } catch (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
  },

  async update(id: string, updates: Partial<Candidate>): Promise<void> {
    try {
      await updateDoc(doc(db, CANDIDATES_COLLECTION, id), updates);
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw new Error('Error al actualizar candidato');
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, CANDIDATES_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw new Error('Error al eliminar candidato');
    }
  }
};

// Servicio de Entrevistas
export const interviewsService = {
  async create(interview: Omit<Interview, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, INTERVIEWS_COLLECTION), {
        ...interview,
        date: Timestamp.fromDate(interview.date),
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating interview:', error);
      throw new Error('Error al programar entrevista');
    }
  },

  async getAll(companyId: string): Promise<Interview[]> {
    try {
      const q = query(
        collection(db, INTERVIEWS_COLLECTION),
        where('companyId', '==', companyId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Interview[];
    } catch (error) {
      console.error('Error fetching interviews:', error);
      return [];
    }
  },

  async getByStatus(companyId: string, status: InterviewStatus): Promise<Interview[]> {
    try {
      const q = query(
        collection(db, INTERVIEWS_COLLECTION),
        where('companyId', '==', companyId),
        where('status', '==', status),
        orderBy('date', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Interview[];
    } catch (error) {
      console.error('Error fetching interviews by status:', error);
      return [];
    }
  },

  async update(id: string, updates: Partial<Interview>): Promise<void> {
    try {
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.now()
      };
      
      if (updates.date) {
        updateData.date = Timestamp.fromDate(updates.date);
      }
      
      await updateDoc(doc(db, INTERVIEWS_COLLECTION, id), updateData);
    } catch (error) {
      console.error('Error updating interview:', error);
      throw new Error('Error al actualizar entrevista');
    }
  },

  async updateStatus(id: string, status: InterviewStatus): Promise<void> {
    try {
      await updateDoc(doc(db, INTERVIEWS_COLLECTION, id), {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating interview status:', error);
      throw new Error('Error al actualizar estado de entrevista');
    }
  },

  async addEvaluation(id: string, evaluations: InterviewEvaluation[], finalScore: number, decision: 'approved' | 'rejected' | 'pending'): Promise<void> {
    try {
      await updateDoc(doc(db, INTERVIEWS_COLLECTION, id), {
        evaluations,
        finalScore,
        decision,
        status: 'completed',
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error adding evaluation:', error);
      throw new Error('Error al guardar evaluación');
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, INTERVIEWS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting interview:', error);
      throw new Error('Error al eliminar entrevista');
    }
  },

  // Estadísticas
  async getStats(companyId: string) {
    try {
      const interviews = await this.getAll(companyId);
      
      const stats = {
        total: interviews.length,
        scheduled: interviews.filter(i => i.status === 'scheduled').length,
        completed: interviews.filter(i => i.status === 'completed').length,
        approved: interviews.filter(i => i.decision === 'approved').length,
        rejected: interviews.filter(i => i.decision === 'rejected').length,
        pending: interviews.filter(i => i.decision === 'pending').length,
        averageScore: 0
      };

      const completedWithScore = interviews.filter(i => i.finalScore);
      if (completedWithScore.length > 0) {
        stats.averageScore = completedWithScore.reduce((sum, i) => sum + (i.finalScore || 0), 0) / completedWithScore.length;
      }

      return stats;
    } catch (error) {
      console.error('Error getting interview stats:', error);
      return {
        total: 0,
        scheduled: 0,
        completed: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
        averageScore: 0
      };
    }
  }
};

export default interviewsService;
