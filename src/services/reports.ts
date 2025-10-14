/**
 * Servicio para generar reportes y analytics - Versión Simplificada
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  getAttendancesByCompany, 
  getAttendanceStats
} from './attendance';
import { getPayrollsByCompany } from './payroll';
import { getEmployeesByCompany } from './employees';
import { 
  Attendance, 
  Employee, 
  JobPosition, 
  Payroll,
  Timestamp 
} from '@/lib/firestore';

// Tipos para reportes
export interface ReportFilters {
  companyId: string;
  startDate: Date;
  endDate: Date;
  employeeIds?: string[];
  departments?: string[];
}

export interface ReportData {
  type: 'attendance' | 'payroll' | 'employees' | 'overview';
  data: any;
  generatedAt: Date;
  filters: ReportFilters;
}

export type ReportType = 'attendance' | 'payroll' | 'employees' | 'overview';
export type ReportFilter = ReportFilters;

export interface SimpleMetrics {
  totalEmployees: number;
  totalAttendances: number;
  averageHours: number;
  totalPayroll: number;
}

/**
 * Generar datos básicos para reportes
 */
export const generateReportData = async (
  type: ReportType,
  filters: ReportFilters
): Promise<ReportData> => {
  const { companyId, startDate, endDate } = filters;

  try {
    switch (type) {
      case 'attendance':
        return await generateAttendanceData(filters);
      case 'payroll':
        return await generatePayrollData(filters);
      case 'employees':
        return await generateEmployeeData(filters);
      case 'overview':
        return await generateOverviewData(filters);
      default:
        throw new Error('Tipo de reporte no válido');
    }
  } catch (error) {
    console.error('Error generating report data:', error);
    throw error;
  }
};

/**
 * Generar datos de asistencia
 */
async function generateAttendanceData(filters: ReportFilters): Promise<ReportData> {
  const { companyId, startDate, endDate } = filters;
  
  const attendances = await getAttendancesByCompany(companyId, startDate, endDate);
  const stats = await getAttendanceStats(companyId, startDate, endDate);

  const data = {
    attendances,
    stats,
    totalRecords: attendances.length,
    dateRange: { startDate, endDate },
    chartData: attendances.map(a => ({
      date: a.date instanceof Timestamp ? a.date.toDate().toISOString().split('T')[0] : 'N/A',
      status: a.status,
      hours: a.totalHours || 0
    }))
  };

  return {
    type: 'attendance',
    data,
    generatedAt: new Date(),
    filters
  };
}

/**
 * Generar datos de nómina
 */
async function generatePayrollData(filters: ReportFilters): Promise<ReportData> {
  const { companyId } = filters;
  
  const payrolls = await getPayrollsByCompany(companyId);
  const employees = await getEmployeesByCompany(companyId);

  const totalGross = payrolls.reduce((sum, p) => sum + p.totalGross, 0);
  const totalNet = payrolls.reduce((sum, p) => sum + p.totalNet, 0);

  const data = {
    payrolls,
    employees,
    totalGross,
    totalNet,
    averageSalary: payrolls.length > 0 ? totalNet / payrolls.length : 0,
    chartData: payrolls.map(p => ({
      employee: employees.find(e => e.id === p.employeeId)?.name || 'Desconocido',
      grossSalary: p.totalGross,
      netSalary: p.totalNet
    }))
  };

  return {
    type: 'payroll',
    data,
    generatedAt: new Date(),
    filters
  };
}

/**
 * Generar datos de empleados
 */
async function generateEmployeeData(filters: ReportFilters): Promise<ReportData> {
  const { companyId } = filters;
  
  const employees = await getEmployeesByCompany(companyId);
  
  // Agrupar por departamento
  const departmentGroups = employees.reduce((acc, emp) => {
    const dept = emp.department || 'Sin departamento';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  const data = {
    employees,
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'activo').length,
    departmentGroups,
    chartData: Object.entries(departmentGroups).map(([dept, emps]) => ({
      department: dept,
      count: emps.length
    }))
  };

  return {
    type: 'employees',
    data,
    generatedAt: new Date(),
    filters
  };
}

/**
 * Generar resumen general
 */
async function generateOverviewData(filters: ReportFilters): Promise<ReportData> {
  const { companyId, startDate, endDate } = filters;
  
  const [employees, attendances, payrolls] = await Promise.all([
    getEmployeesByCompany(companyId),
    getAttendancesByCompany(companyId, startDate, endDate),
    getPayrollsByCompany(companyId)
  ]);

  const stats = await getAttendanceStats(companyId, startDate, endDate);

  const data = {
    overview: {
      totalEmployees: employees.length,
      activeEmployees: employees.filter(e => e.status === 'activo').length,
      totalAttendances: attendances.length,
      averageHours: stats.averageHours,
      totalPayroll: payrolls.reduce((sum, p) => sum + p.totalNet, 0),
      attendanceRate: (attendances.length / employees.length) * 100
    },
    employees,
    attendances,
    payrolls,
    stats
  };

  return {
    type: 'overview',
    data,
    generatedAt: new Date(),
    filters
  };
}

/**
 * Exportar a PDF
 */
export const generatePDFReport = async (
  elementId: string,
  filename: string = 'reporte.pdf'
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento no encontrado para generar PDF');
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    
    const imgWidth = 190;
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 10;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Exportar a CSV
 */
export const exportToCSV = (
  data: any[],
  filename: string = 'reporte.csv'
): void => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};