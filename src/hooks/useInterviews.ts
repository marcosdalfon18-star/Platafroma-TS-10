/**
 * Hook personalizado para gestión de entrevistas
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  interviewsService, 
  candidatesService, 
  Interview, 
  Candidate, 
  InterviewStatus,
  InterviewEvaluation 
} from '@/services/interviews';

export const useInterviews = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    scheduled: 0,
    completed: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    averageScore: 0
  });

  const companyId = user?.companyId || 'default-company';

  // Cargar datos iniciales
  const fetchData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [interviewsData, candidatesData, statsData] = await Promise.all([
        interviewsService.getAll(companyId),
        candidatesService.getAll(companyId),
        interviewsService.getStats(companyId)
      ]);
      
      setInterviews(interviewsData);
      setCandidates(candidatesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching interviews data:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las entrevistas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, companyId, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Gestión de Candidatos
  const createCandidate = async (candidateData: Omit<Candidate, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      const candidateWithCompany = {
        ...candidateData,
        companyId
      };
      const id = await candidatesService.create(candidateWithCompany);
      const newCandidate = { ...candidateWithCompany, id, createdAt: new Date() };
      setCandidates(prev => [newCandidate, ...prev]);
      
      toast({
        title: "Candidato creado",
        description: "El candidato se ha registrado exitosamente"
      });
      
      return id;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el candidato",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
    try {
      await candidatesService.update(id, updates);
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === id ? { ...candidate, ...updates } : candidate
        )
      );
      
      toast({
        title: "Candidato actualizado",
        description: "Los datos se han guardado correctamente"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el candidato",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      await candidatesService.delete(id);
      setCandidates(prev => prev.filter(candidate => candidate.id !== id));
      
      toast({
        title: "Candidato eliminado",
        description: "El candidato ha sido eliminado del sistema"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el candidato",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Gestión de Entrevistas
  const createInterview = async (interviewData: Omit<Interview, 'id' | 'createdAt' | 'updatedAt' | 'companyId'>) => {
    try {
      setLoading(true);
      const interviewWithCompany = {
        ...interviewData,
        companyId
      };
      const id = await interviewsService.create(interviewWithCompany);
      const newInterview = { 
        ...interviewWithCompany, 
        id, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      };
      setInterviews(prev => [newInterview, ...prev]);
      
      // Actualizar estadísticas
      const newStats = await interviewsService.getStats(companyId);
      setStats(newStats);
      
      toast({
        title: "Entrevista programada",
        description: "La entrevista se ha programado exitosamente"
      });
      
      return id;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo programar la entrevista",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateInterview = async (id: string, updates: Partial<Interview>) => {
    try {
      await interviewsService.update(id, updates);
      setInterviews(prev => 
        prev.map(interview => 
          interview.id === id ? { ...interview, ...updates, updatedAt: new Date() } : interview
        )
      );
      
      // Actualizar estadísticas si cambió el estado
      if (updates.status || updates.decision) {
        const newStats = await interviewsService.getStats(companyId);
        setStats(newStats);
      }
      
      toast({
        title: "Entrevista actualizada",
        description: "Los datos se han guardado correctamente"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la entrevista",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateInterviewStatus = async (id: string, status: InterviewStatus) => {
    try {
      await interviewsService.updateStatus(id, status);
      setInterviews(prev => 
        prev.map(interview => 
          interview.id === id ? { ...interview, status, updatedAt: new Date() } : interview
        )
      );
      
      const newStats = await interviewsService.getStats(companyId);
      setStats(newStats);
      
      const statusMessages = {
        'scheduled': 'Entrevista programada',
        'in-progress': 'Entrevista en progreso', 
        'completed': 'Entrevista completada',
        'cancelled': 'Entrevista cancelada',
        'rescheduled': 'Entrevista reprogramada'
      };
      
      toast({
        title: "Estado actualizado",
        description: statusMessages[status]
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive"
      });
      throw error;
    }
  };

  const addEvaluation = async (
    id: string, 
    evaluations: InterviewEvaluation[], 
    finalScore: number, 
    decision: 'approved' | 'rejected' | 'pending',
    notes?: string
  ) => {
    try {
      await interviewsService.addEvaluation(id, evaluations, finalScore, decision);
      setInterviews(prev => 
        prev.map(interview => 
          interview.id === id 
            ? { 
                ...interview, 
                evaluations, 
                finalScore, 
                decision, 
                notes,
                status: 'completed' as InterviewStatus,
                updatedAt: new Date() 
              } 
            : interview
        )
      );
      
      const newStats = await interviewsService.getStats(companyId);
      setStats(newStats);
      
      toast({
        title: "Evaluación guardada",
        description: "La evaluación de la entrevista se ha guardado exitosamente"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la evaluación",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteInterview = async (id: string) => {
    try {
      await interviewsService.delete(id);
      setInterviews(prev => prev.filter(interview => interview.id !== id));
      
      const newStats = await interviewsService.getStats(companyId);
      setStats(newStats);
      
      toast({
        title: "Entrevista eliminada",
        description: "La entrevista ha sido eliminada del sistema"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la entrevista",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Utilidades
  const getInterviewsByStatus = (status: InterviewStatus) => {
    return interviews.filter(interview => interview.status === status);
  };

  const getUpcomingInterviews = () => {
    const now = new Date();
    return interviews.filter(interview => 
      interview.status === 'scheduled' && interview.date >= now
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getTodaysInterviews = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return interviews.filter(interview => 
      interview.date >= today && interview.date < tomorrow
    ).sort((a, b) => a.time.localeCompare(b.time));
  };

  return {
    // Data
    interviews,
    candidates,
    stats,
    loading,
    
    // Candidates methods
    createCandidate,
    updateCandidate,
    deleteCandidate,
    
    // Interviews methods
    createInterview,
    updateInterview,
    updateInterviewStatus,
    addEvaluation,
    deleteInterview,
    
    // Utilities
    getInterviewsByStatus,
    getUpcomingInterviews,
    getTodaysInterviews,
    fetchData
  };
};

export default useInterviews;
