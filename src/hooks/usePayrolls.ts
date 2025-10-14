/**
 * Hook personalizado para gestionar nóminas
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getPayrollsByCompany,
  getPayrollsByEmployee,
  getPayrollsByPeriod,
  getPayrollSummary,
  createPayroll,
  updatePayroll,
  deletePayroll,
  approvePayroll,
  markPayrollAsPaid,
  CreatePayrollInput,
  UpdatePayrollInput,
} from '@/services/payroll';
import { Payroll } from '@/lib/firestore';

export const usePayrolls = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<any>(null);

  // Obtener companyId del usuario
  const companyId = user?.companyId || 'default-company';

  /**
   * Cargar nóminas por empresa
   */
  const loadPayrolls = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getPayrollsByCompany(companyId);
      setPayrolls(data);
    } catch (error) {
      console.error('Error loading payrolls:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las nóminas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar nóminas de un empleado específico
   */
  const loadEmployeePayrolls = async (employeeId: string) => {
    setLoading(true);
    try {
      const data = await getPayrollsByEmployee(employeeId);
      setPayrolls(data);
    } catch (error) {
      console.error('Error loading employee payrolls:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las nóminas del empleado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar nóminas por período
   */
  const loadPayrollsByPeriod = async (month: number, year: number) => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getPayrollsByPeriod(companyId, month, year);
      setPayrolls(data);
      
      // También cargar el resumen
      const summaryData = await getPayrollSummary(companyId, month, year);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading payrolls by period:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las nóminas del período",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crear nueva nómina
   */
  const createNewPayroll = async (data: Omit<CreatePayrollInput, 'companyId' | 'createdBy'>) => {
    if (!user) return;

    setLoading(true);
    try {
      const payrollId = await createPayroll({
        ...data,
        companyId,
        createdBy: user.uid,
      });

      toast({
        title: "Éxito",
        description: "Nómina creada correctamente"
      });

      // Recargar datos
      await loadPayrolls();
      return payrollId;
    } catch (error) {
      console.error('Error creating payroll:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la nómina",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar nómina
   */
  const updateExistingPayroll = async (id: string, data: UpdatePayrollInput) => {
    setLoading(true);
    try {
      await updatePayroll(id, data);

      toast({
        title: "Éxito",
        description: "Nómina actualizada correctamente"
      });

      // Recargar datos
      await loadPayrolls();
    } catch (error) {
      console.error('Error updating payroll:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la nómina",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar nómina
   */
  const removePayroll = async (id: string) => {
    setLoading(true);
    try {
      await deletePayroll(id);

      toast({
        title: "Éxito",
        description: "Nómina eliminada correctamente"
      });

      // Recargar datos
      await loadPayrolls();
    } catch (error) {
      console.error('Error deleting payroll:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la nómina",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Aprobar nómina
   */
  const approvePayrollById = async (id: string) => {
    try {
      await approvePayroll(id);
      toast({
        title: "Éxito",
        description: "Nómina aprobada correctamente"
      });
      await loadPayrolls();
    } catch (error) {
      console.error('Error approving payroll:', error);
      toast({
        title: "Error",
        description: "No se pudo aprobar la nómina",
        variant: "destructive"
      });
    }
  };

  /**
   * Marcar como pagada
   */
  const markAsPaid = async (id: string) => {
    try {
      await markPayrollAsPaid(id);
      toast({
        title: "Éxito",
        description: "Nómina marcada como pagada"
      });
      await loadPayrolls();
    } catch (error) {
      console.error('Error marking payroll as paid:', error);
      toast({
        title: "Error",
        description: "No se pudo marcar la nómina como pagada",
        variant: "destructive"
      });
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    if (user) {
      loadPayrolls();
    }
  }, [user]);

  return {
    payrolls,
    loading,
    summary,
    loadPayrolls,
    loadEmployeePayrolls,
    loadPayrollsByPeriod,
    createPayroll: createNewPayroll,
    updatePayroll: updateExistingPayroll,
    deletePayroll: removePayroll,
    approvePayroll: approvePayrollById,
    markAsPaid,
  };
};