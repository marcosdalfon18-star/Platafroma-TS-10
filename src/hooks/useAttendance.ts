/**
 * Hook personalizado para gestionar asistencias y control horario
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Attendance, 
  Employee
} from '@/lib/firestore';
import {
  createAttendance,
  updateAttendance,
  getAttendancesByEmployee,
  getAttendancesByCompany,
  getAttendanceByEmployeeAndDate,
  getAttendanceStats,
  checkIn as checkInService,
  checkOut as checkOutService,
  startBreak as startBreakService,
  endBreak as endBreakService,
  CreateAttendanceInput,
  UpdateAttendanceInput
} from '@/services/attendance';
import { getEmployeesByCompany } from '@/services/employees';
import { toast } from '@/hooks/use-toast';

export interface AttendanceFilters {
  employeeId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: 'present' | 'absent' | 'late' | 'half_day' | 'holiday';
}

export interface AttendanceStats {
  totalRecords: number;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
  holiday: number;
  averageHours: number;
  totalHours: number;
}

export const useAttendance = () => {
  const { user } = useAuth();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(null);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const companyId = user?.companyId;
  const employeeId = user?.role === 'empleado' ? user.uid : undefined;

  /**
   * Cargar empleados de la empresa
   */
  const loadEmployees = useCallback(async () => {
    if (!companyId) return;

    try {
      setLoading(true);
      const employeesData = await getEmployeesByCompany(companyId);
      setEmployees(employeesData);
    } catch (err) {
      console.error('Error loading employees:', err);
      setError('Error al cargar empleados');
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  /**
   * Cargar asistencias con filtros
   */
  const loadAttendances = useCallback(async (filters: AttendanceFilters = {}) => {
    if (!companyId) return;

    try {
      setLoading(true);
      setError(null);

      let attendancesData: Attendance[];

      if (filters.employeeId) {
        attendancesData = await getAttendancesByEmployee(
          filters.employeeId,
          filters.startDate,
          filters.endDate
        );
      } else {
        attendancesData = await getAttendancesByCompany(
          companyId,
          filters.startDate,
          filters.endDate
        );
      }

      // Aplicar filtro de estado si se especifica
      if (filters.status) {
        attendancesData = attendancesData.filter(a => a.status === filters.status);
      }

      setAttendances(attendancesData);
    } catch (err) {
      console.error('Error loading attendances:', err);
      setError('Error al cargar asistencias');
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las asistencias',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  /**
   * Cargar asistencia de hoy para el usuario actual
   */
  const loadTodayAttendance = useCallback(async () => {
    if (!employeeId) return;

    try {
      const today = new Date();
      const attendance = await getAttendanceByEmployeeAndDate(employeeId, today);
      setTodayAttendance(attendance);
    } catch (err) {
      console.error('Error loading today attendance:', err);
    }
  }, [employeeId]);

  /**
   * Cargar estadísticas de asistencia
   */
  const loadStats = useCallback(async (startDate: Date, endDate: Date) => {
    if (!companyId) return;

    try {
      setLoading(true);
      const statsData = await getAttendanceStats(companyId, startDate, endDate);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading attendance stats:', err);
      setError('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  /**
   * Registrar entrada
   */
  const handleCheckIn = useCallback(async () => {
    if (!employeeId || !companyId) return;

    try {
      setLoading(true);
      await checkInService(employeeId, companyId);
      await loadTodayAttendance();
      
      toast({
        title: 'Entrada registrada',
        description: 'Tu hora de entrada ha sido registrada exitosamente',
      });
    } catch (err) {
      console.error('Error checking in:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar entrada';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [employeeId, companyId, loadTodayAttendance]);

  /**
   * Registrar salida
   */
  const handleCheckOut = useCallback(async () => {
    if (!employeeId || !companyId) return;

    try {
      setLoading(true);
      await checkOutService(employeeId, companyId);
      await loadTodayAttendance();
      
      toast({
        title: 'Salida registrada',
        description: 'Tu hora de salida ha sido registrada exitosamente',
      });
    } catch (err) {
      console.error('Error checking out:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar salida';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [employeeId, companyId, loadTodayAttendance]);

  /**
   * Iniciar descanso
   */
  const handleStartBreak = useCallback(async () => {
    if (!employeeId) return;

    try {
      setLoading(true);
      await startBreakService(employeeId);
      await loadTodayAttendance();
      
      toast({
        title: 'Descanso iniciado',
        description: 'Has iniciado tu descanso',
      });
    } catch (err) {
      console.error('Error starting break:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar descanso';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [employeeId, loadTodayAttendance]);

  /**
   * Terminar descanso
   */
  const handleEndBreak = useCallback(async () => {
    if (!employeeId) return;

    try {
      setLoading(true);
      await endBreakService(employeeId);
      await loadTodayAttendance();
      
      toast({
        title: 'Descanso terminado',
        description: 'Has terminado tu descanso',
      });
    } catch (err) {
      console.error('Error ending break:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al terminar descanso';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [employeeId, loadTodayAttendance]);

  /**
   * Crear asistencia manual
   */
  const createAttendanceRecord = useCallback(async (data: CreateAttendanceInput) => {
    try {
      setLoading(true);
      await createAttendance(data);
      await loadAttendances();
      
      toast({
        title: 'Asistencia creada',
        description: 'El registro de asistencia ha sido creado exitosamente',
      });
    } catch (err) {
      console.error('Error creating attendance:', err);
      toast({
        title: 'Error',
        description: 'Error al crear registro de asistencia',
        variant: 'destructive'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadAttendances]);

  /**
   * Actualizar asistencia
   */
  const updateAttendanceRecord = useCallback(async (id: string, data: UpdateAttendanceInput) => {
    try {
      setLoading(true);
      await updateAttendance(id, data);
      await loadAttendances();
      
      toast({
        title: 'Asistencia actualizada',
        description: 'El registro de asistencia ha sido actualizado exitosamente',
      });
    } catch (err) {
      console.error('Error updating attendance:', err);
      toast({
        title: 'Error',
        description: 'Error al actualizar registro de asistencia',
        variant: 'destructive'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadAttendances]);

  // Cargar datos iniciales
  useEffect(() => {
    if (companyId) {
      loadEmployees();
      loadAttendances();
    }
    if (employeeId) {
      loadTodayAttendance();
    }
  }, [companyId, employeeId, loadEmployees, loadAttendances, loadTodayAttendance]);

  return {
    // Estado
    attendances,
    employees,
    todayAttendance,
    stats,
    loading,
    error,
    
    // Funciones de carga
    loadAttendances,
    loadTodayAttendance,
    loadStats,
    
    // Funciones de control horario
    handleCheckIn,
    handleCheckOut,
    handleStartBreak,
    handleEndBreak,
    
    // Funciones CRUD
    createAttendanceRecord,
    updateAttendanceRecord,
    
    // Información del usuario
    canUseTimeClock: !!employeeId,
    isEmployee: user?.role === 'empleado',
  };
};