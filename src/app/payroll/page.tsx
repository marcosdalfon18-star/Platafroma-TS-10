
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Download, 
  Eye, 
  Check, 
  CreditCard, 
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Loader2
} from "lucide-react";
import { usePayrolls } from "@/hooks/usePayrolls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreatePayrollModal, { PayrollFormData } from "@/components/modals/CreatePayrollModal";

const MONTHS = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

export default function PayrollPage() {
  const { 
    payrolls, 
    loading, 
    summary, 
    loadPayrollsByPeriod,
    approvePayroll,
    markAsPaid,
    createPayroll
  } = usePayrolls();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock employees data - en producción vendría de un servicio
  const mockEmployees = [
    { id: 'emp1', name: 'Ana García', position: 'Desarrolladora Frontend', baseSalary: 2500 },
    { id: 'emp2', name: 'Carlos López', position: 'Gerente de Ventas', baseSalary: 3000 },
    { id: 'emp3', name: 'María Rodríguez', position: 'Analista de Marketing', baseSalary: 2200 },
  ];

  const handlePeriodChange = () => {
    loadPayrollsByPeriod(selectedMonth, selectedYear);
  };

  React.useEffect(() => {
    handlePeriodChange();
  }, [selectedMonth, selectedYear]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'approved': return 'default';
      case 'paid': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Borrador';
      case 'approved': return 'Aprobado';
      case 'paid': return 'Pagado';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Nóminas</h1>
          <p className="text-muted-foreground">
            Administra los pagos y nóminas de todos los empleados
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Nómina
        </Button>
      </header>

      {/* Filtros de Período */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Período de Nómina
          </CardTitle>
          <CardDescription>
            Selecciona el mes y año para ver las nóminas correspondientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Select 
              value={selectedMonth.toString()} 
              onValueChange={(value) => setSelectedMonth(parseInt(value))}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={selectedYear.toString()} 
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de Nóminas */}
      {summary && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Empleados</p>
                  <p className="text-2xl font-bold">{summary.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Bruto</p>
                  <p className="text-2xl font-bold">{formatCurrency(summary.totalGross)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Neto</p>
                  <p className="text-2xl font-bold">{formatCurrency(summary.totalNet)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Pagadas</p>
                  <p className="text-2xl font-bold">{summary.byStatus.paid}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabla de Nóminas */}
      <Card>
        <CardHeader>
          <CardTitle>Nóminas del Período</CardTitle>
          <CardDescription>
            Lista de todas las nóminas para {MONTHS.find(m => m.value === selectedMonth)?.label} {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Cargando nóminas...</span>
            </div>
          ) : payrolls.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay nóminas para este período</p>
              <p className="text-sm">Crea la primera nómina para comenzar</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Salario Base</TableHead>
                  <TableHead>Total Bruto</TableHead>
                  <TableHead>Total Neto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrolls.map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell className="font-medium">
                      {payroll.employeeId}
                    </TableCell>
                    <TableCell>{formatCurrency(payroll.baseSalary)}</TableCell>
                    <TableCell>{formatCurrency(payroll.totalGross)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(payroll.totalNet)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(payroll.status)}>
                        {getStatusLabel(payroll.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payroll.status === 'draft' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => approvePayroll(payroll.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        {payroll.status === 'approved' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsPaid(payroll.id)}
                          >
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal para crear nómina */}
      <CreatePayrollModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={async (data: PayrollFormData) => {
          try {
            await createPayroll(data);
            handlePeriodChange(); // Recargar datos
          } catch (error) {
            // Error manejado en el hook
          }
        }}
        employees={mockEmployees}
      />
    </div>
  );
}
