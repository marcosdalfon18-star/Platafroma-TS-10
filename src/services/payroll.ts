/**
 * Servicio para gestionar nóminas en Firestore
 */

import { where, orderBy, Timestamp } from 'firebase/firestore';
import { 
  Payroll, 
  PayrollItem,
  COLLECTIONS, 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  getDocumentsByQuery, 
  getDocumentById 
} from '@/lib/firestore';

export interface CreatePayrollInput {
  employeeId: string;
  companyId: string;
  period: {
    month: number;
    year: number;
  };
  baseSalary: number;
  bonuses?: PayrollItem[];
  deductions?: PayrollItem[];
  createdBy: string;
}

export interface UpdatePayrollInput {
  baseSalary?: number;
  bonuses?: PayrollItem[];
  deductions?: PayrollItem[];
  status?: "draft" | "approved" | "paid";
  totalGross?: number;
  totalNet?: number;
}

/**
 * Calcular totales de nómina
 */
export const calculatePayrollTotals = (
  baseSalary: number, 
  bonuses: PayrollItem[] = [], 
  deductions: PayrollItem[] = []
) => {
  const totalBonuses = bonuses.reduce((sum, bonus) => sum + bonus.amount, 0);
  const totalDeductions = deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
  
  const totalGross = baseSalary + totalBonuses;
  const totalNet = totalGross - totalDeductions;

  return {
    totalBonuses,
    totalDeductions,
    totalGross,
    totalNet
  };
};

/**
 * Crear una nueva nómina
 */
export const createPayroll = async (data: CreatePayrollInput): Promise<string> => {
  const { totalGross, totalNet } = calculatePayrollTotals(
    data.baseSalary, 
    data.bonuses, 
    data.deductions
  );

  const payroll = {
    ...data,
    bonuses: data.bonuses || [],
    deductions: data.deductions || [],
    totalGross,
    totalNet,
    status: "draft" as const,
  };

  const docRef = await createDocument('PAYROLLS', payroll);
  return docRef.id;
};

/**
 * Actualizar una nómina
 */
export const updatePayroll = async (
  id: string, 
  data: UpdatePayrollInput
): Promise<void> => {
  let updateData = { ...data };

  // Recalcular totales si se actualizan salario, bonos o deducciones
  if (data.baseSalary !== undefined || data.bonuses || data.deductions) {
    // Obtener datos actuales para el cálculo
    const currentPayroll = await getPayrollById(id) as Payroll;
    if (currentPayroll) {
      const baseSalary = data.baseSalary ?? currentPayroll.baseSalary;
      const bonuses = data.bonuses ?? currentPayroll.bonuses;
      const deductions = data.deductions ?? currentPayroll.deductions;

      const { totalGross, totalNet } = calculatePayrollTotals(baseSalary, bonuses, deductions);
      updateData = { ...updateData, totalGross, totalNet };
    }
  }

  await updateDocument('PAYROLLS', id, updateData);
};

/**
 * Eliminar una nómina
 */
export const deletePayroll = async (id: string): Promise<void> => {
  await deleteDocument('PAYROLLS', id);
};

/**
 * Obtener nómina por ID
 */
export const getPayrollById = async (id: string): Promise<Payroll | null> => {
  return await getDocumentById('PAYROLLS', id) as Payroll | null;
};

/**
 * Obtener nóminas por empleado
 */
export const getPayrollsByEmployee = async (employeeId: string): Promise<Payroll[]> => {
  return await getDocumentsByQuery('PAYROLLS', [
    where('employeeId', '==', employeeId),
    orderBy('createdAt', 'desc')
  ]) as Payroll[];
};

/**
 * Obtener nóminas por empresa
 */
export const getPayrollsByCompany = async (companyId: string): Promise<Payroll[]> => {
  return await getDocumentsByQuery('PAYROLLS', [
    where('companyId', '==', companyId),
    orderBy('createdAt', 'desc')
  ]) as Payroll[];
};

/**
 * Obtener nóminas por período
 */
export const getPayrollsByPeriod = async (
  companyId: string, 
  month: number, 
  year: number
): Promise<Payroll[]> => {
  return await getDocumentsByQuery('PAYROLLS', [
    where('companyId', '==', companyId),
    where('period.month', '==', month),
    where('period.year', '==', year),
    orderBy('createdAt', 'desc')
  ]) as Payroll[];
};

/**
 * Obtener nóminas por estado
 */
export const getPayrollsByStatus = async (
  companyId: string, 
  status: "draft" | "approved" | "paid"
): Promise<Payroll[]> => {
  return await getDocumentsByQuery('PAYROLLS', [
    where('companyId', '==', companyId),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  ]) as Payroll[];
};

/**
 * Aprobar nómina
 */
export const approvePayroll = async (id: string): Promise<void> => {
  await updatePayroll(id, { status: 'approved' });
};

/**
 * Marcar nómina como pagada
 */
export const markPayrollAsPaid = async (id: string): Promise<void> => {
  await updatePayroll(id, { status: 'paid' });
};

/**
 * Obtener resumen de nóminas por período
 */
export const getPayrollSummary = async (companyId: string, month: number, year: number) => {
  const payrolls = await getPayrollsByPeriod(companyId, month, year);
  
  const summary = {
    totalEmployees: payrolls.length,
    totalGross: payrolls.reduce((sum, p) => sum + p.totalGross, 0),
    totalNet: payrolls.reduce((sum, p) => sum + p.totalNet, 0),
    totalDeductions: payrolls.reduce((sum, p) => sum + p.deductions.reduce((d, item) => d + item.amount, 0), 0),
    totalBonuses: payrolls.reduce((sum, p) => sum + p.bonuses.reduce((b, item) => b + item.amount, 0), 0),
    byStatus: {
      draft: payrolls.filter(p => p.status === 'draft').length,
      approved: payrolls.filter(p => p.status === 'approved').length,
      paid: payrolls.filter(p => p.status === 'paid').length,
    }
  };

  return summary;
};