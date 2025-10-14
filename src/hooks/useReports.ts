import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  generateReportData,
  generatePDFReport,
  exportToCSV,
  ReportType,
  ReportFilter,
  ReportData
} from '@/services/reports';

export const useReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentReport, setCurrentReport] = useState<ReportData | null>(null);
  const { user } = useAuth();

  const generateReport = useCallback(async (
    type: ReportType,
    filters: ReportFilter
  ) => {
    if (!user?.companyId) {
      toast({
        title: 'Error',
        description: 'No se encontró la información de la empresa',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const reportData = await generateReportData(type, {
        ...filters,
        companyId: user.companyId
      });
      setCurrentReport(reportData);
      toast({
        title: 'Reporte generado',
        description: 'El reporte se ha generado correctamente',
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: 'Error',
        description: 'Error al generar el reporte',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.companyId]);

  const exportToPDF = useCallback(async (elementId: string, filename?: string) => {
    if (!currentReport) {
      toast({
        title: 'Error',
        description: 'No hay reporte para exportar',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await generatePDFReport(elementId, filename);
      toast({
        title: 'PDF exportado',
        description: 'El reporte se ha exportado correctamente',
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: 'Error',
        description: 'Error al exportar el PDF',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentReport]);

  const exportToCSVFile = useCallback((filename?: string) => {
    if (!currentReport?.data) {
      toast({
        title: 'Error',
        description: 'No hay datos para exportar',
        variant: 'destructive',
      });
      return;
    }

    try {
      let csvData = [];
      
      if (currentReport.type === 'attendance' && currentReport.data.attendances) {
        csvData = currentReport.data.attendances.map((attendance: any) => ({
          fecha: attendance.date,
          empleado: attendance.employeeName || 'N/A',
          estado: attendance.status,
          horas: attendance.totalHours || 0
        }));
      } else if (currentReport.type === 'payroll' && currentReport.data.payrolls) {
        csvData = currentReport.data.payrolls.map((payroll: any) => ({
          empleado: payroll.employeeName || 'N/A',
          salarioBruto: payroll.grossSalary,
          salarioNeto: payroll.netSalary
        }));
      } else if (currentReport.type === 'employees' && currentReport.data.employees) {
        csvData = currentReport.data.employees.map((employee: any) => ({
          nombre: employee.name,
          email: employee.email,
          departamento: employee.department || 'N/A',
          estado: employee.status
        }));
      }

      exportToCSV(csvData, filename);
      toast({
        title: 'CSV exportado',
        description: 'Los datos se han exportado correctamente',
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast({
        title: 'Error',
        description: 'Error al exportar el CSV',
        variant: 'destructive',
      });
    }
  }, [currentReport]);

  return {
    isLoading,
    currentReport,
    generateReport,
    exportToPDF,
    exportToCSVFile,
    clearReport: () => setCurrentReport(null)
  };
};