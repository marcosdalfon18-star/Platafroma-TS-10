'use client';

import { useState } from 'react';
import { CalendarIcon, Download, FileText, Users, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useReports } from '@/hooks/useReports';
import { ReportType } from '@/services/reports';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ReportsPageContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<ReportType>('overview');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const { isLoading, currentReport, generateReport, exportToPDF, exportToCSVFile } = useReports();

  // Definir permisos basados en roles
  const permissions = {
    canGenerateReports: user?.role === 'consultor' || user?.role === 'empresario',
    canExportReports: user?.role === 'consultor' || user?.role === 'empresario',
    canViewAllData: user?.role === 'consultor' || user?.role === 'empresario',
    canViewLimitedData: user?.role === 'empleado' || user?.role === 'gestor',
    isReadOnly: user?.role === 'empleado' || user?.role === 'gestor'
  };

  // Filtrar tipos de reportes según el rol
  const getAvailableReportTypes = () => {
    if (user?.role === 'consultor' || user?.role === 'empresario') {
      return reportTypes; // Acceso a todos los reportes
    } else if (user?.role === 'empleado' || user?.role === 'gestor') {
      // Solo reportes básicos para empleados/gestores
      return reportTypes.filter(type => 
        type.value === 'overview' || type.value === 'attendance'
      );
    }
    return [];
  };

  const handleGenerateReport = async () => {
    if (!permissions.canGenerateReports) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo Consultoras y Empresarios pueden generar reportes",
        variant: "destructive"
      });
      return;
    }

    const filters = {
      companyId: '', // Se añadirá automáticamente en el hook
      startDate: new Date(startDate || Date.now()),
      endDate: new Date(endDate || Date.now())
    };

    await generateReport(selectedType, filters);
  };

  const handleExportPDF = () => {
    if (!permissions.canExportReports) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo Consultoras y Empresarios pueden exportar reportes",
        variant: "destructive"
      });
      return;
    }
    exportToPDF('report-content');
  };

  const handleExportCSV = () => {
    if (!permissions.canExportReports) {
      toast({
        title: "Permisos insuficientes", 
        description: "Solo Consultoras y Empresarios pueden exportar reportes",
        variant: "destructive"
      });
      return;
    }
    exportToCSVFile();
  };

  const reportTypes = [
    { value: 'overview', label: 'Resumen General', icon: FileText },
    { value: 'attendance', label: 'Asistencias', icon: Clock },
    { value: 'payroll', label: 'Nóminas', icon: DollarSign },
    { value: 'employees', label: 'Empleados', icon: Users }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {user?.role === 'consultor' ? 'Centro de Reportes' : 
             user?.role === 'empresario' ? 'Reportes de la Empresa' : 
             'Consulta de Reportes'}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'consultor' ? 'Genera y exporta reportes completos de todas las empresas' :
             user?.role === 'empresario' ? 'Accede a reportes de tu empresa' :
             'Consulta reportes básicos disponibles'}
          </p>
          
          {/* Indicador de rol y permisos */}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={user?.role === 'consultor' ? 'default' : 'secondary'}>
              {user?.role === 'consultor' ? '👩‍💼 Consultora - Acceso Completo' :
               user?.role === 'empresario' ? '🏢 Empresario - Reportes Empresariales' :
               user?.role === 'empleado' ? '👨‍💻 Empleado - Vista Básica' : 
               user?.role === 'gestor' ? '👔 Gestor - Vista Limitada' : 'Usuario'}
            </Badge>
            {permissions.isReadOnly && (
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                👁️ Solo Consulta
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Filtros y Configuración */}
      <Card>
        <CardHeader>
          <CardTitle>Generar Reporte</CardTitle>
          <CardDescription>
            Selecciona el tipo de reporte y configura los filtros
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tipo de Reporte */}
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de Reporte</Label>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as ReportType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableReportTypes().map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fecha Inicio */}
            <div className="space-y-2">
              <Label htmlFor="start-date">Fecha Inicio</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Fecha Fin */}
            <div className="space-y-2">
              <Label htmlFor="end-date">Fecha Fin</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            {permissions.canGenerateReports && (
              <Button onClick={handleGenerateReport} disabled={isLoading}>
                {isLoading ? 'Generando...' : 'Generar Reporte'}
              </Button>
            )}
            {permissions.isReadOnly && (
              <div className="text-sm text-muted-foreground flex items-center">
                <span className="mr-2">ℹ️</span>
                Contacta a tu Consultora o Empresario para generar reportes personalizados
              </div>
            )}
            {currentReport && permissions.canExportReports && (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleExportPDF}
                  disabled={isLoading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleExportCSV}
                  disabled={isLoading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contenido del Reporte */}
      {currentReport && (
        <div id="report-content">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Reporte: {reportTypes.find(t => t.value === currentReport.type)?.label}</span>
                <Badge variant="outline">
                  {currentReport.generatedAt.toLocaleDateString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportContent report={currentReport} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Componente para mostrar el contenido del reporte
const ReportContent = ({ report }: { report: any }) => {
  const { type, data } = report;

  switch (type) {
    case 'overview':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Empleados Totales</p>
                    <p className="text-2xl font-bold">{data.overview?.totalEmployees || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Asistencias</p>
                    <p className="text-2xl font-bold">{data.overview?.totalAttendances || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nómina Total</p>
                    <p className="text-2xl font-bold">${data.overview?.totalPayroll?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 'attendance':
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Registro de Asistencias</h3>
          <p>Total de registros: {data.totalRecords || 0}</p>
          <div className="text-sm text-muted-foreground">
            Datos de asistencia para el período seleccionado
          </div>
        </div>
      );

    case 'payroll':
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reporte de Nóminas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Salario Bruto Total</p>
              <p className="text-xl font-bold">${data.totalGross?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Salario Neto Total</p>
              <p className="text-xl font-bold">${data.totalNet?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>
      );

    case 'employees':
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reporte de Empleados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total de Empleados</p>
              <p className="text-xl font-bold">{data.totalEmployees || 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Empleados Activos</p>
              <p className="text-xl font-bold">{data.activeEmployees || 0}</p>
            </div>
          </div>
        </div>
      );

    default:
      return <p>Tipo de reporte no reconocido</p>;
  }
};

const ReportsPage = () => {
  return (
    <ProtectedRoute allowedRoles={['empresario', 'gestor', 'consultor']}>
      <ReportsPageContent />
    </ProtectedRoute>
  );
};

export default ReportsPage;