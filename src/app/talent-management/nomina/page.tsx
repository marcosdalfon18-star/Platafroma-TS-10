"use client";

import React, { useState, useCallback } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreatePayrollModal, { PayrollFormData } from "@/components/modals/CreatePayrollModal";
import { MetricCard } from '@/components/ui/metric-card';

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

const mockEmployees = [
  { id: 'emp1', name: 'Ana García', position: 'Desarrolladora Senior' },
  { id: 'emp2', name: 'Carlos Mendoza', position: 'Gerente de Operaciones' },
  { id: 'emp3', name: 'Sofía López', position: 'Diseñadora UX' },
];

export default function NominaPage() {
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

  const handlePeriodChange = useCallback(() => {
    loadPayrollsByPeriod(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, loadPayrollsByPeriod]);

  // Cargar datos iniciales
  React.useEffect(() => {
    handlePeriodChange();
  }, [handlePeriodChange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'paid': return 'default';
      case 'approved': return 'secondary';
      case 'draft': return 'outline';
      default: return 'destructive';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagado';
      case 'approved': return 'Aprobado';
      case 'draft': return 'Borrador';
      default: return 'Cancelado';
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            Gestión de Nóminas
          </h1>
          <p className="text-muted-foreground mt-2">
            Administra los pagos y nóminas de todos los empleados
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Nómina
        </Button>
      </header>

      {/* Métricas del resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Nóminas Procesadas"
          value={summary.totalEmployees}
          description="empleados"
          icon={Users}
        />

        <MetricCard
          title="Total Bruto"
          value={formatCurrency(summary.totalGross)}
          description="antes de deducciones"
          icon={TrendingUp}
        />

        <MetricCard
          title="Total Neto"
          value={formatCurrency(summary.totalNet)}
          description="a pagar"
          icon={DollarSign}
        />

        <MetricCard
          title="Deducciones"
          value={formatCurrency(summary.totalDeductions)}
          description="impuestos y contribuciones"
          icon={CreditCard}
        />
      </div>

      {/* Filtros por período */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">Período:</span>
        </div>
        <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
          <SelectTrigger className="w-[140px]">
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
        <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
          <SelectTrigger className="w-[100px]">
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
        <Button variant="outline" onClick={handlePeriodChange}>
          Actualizar
        </Button>
      </div>

      {/* Tabla de nóminas */}
      <Card>
        <CardHeader>
          <CardTitle>
            Nóminas de {MONTHS.find(m => m.value === selectedMonth)?.label} {selectedYear}
          </CardTitle>
          <CardDescription>
            Listado detallado de todas las nóminas del período seleccionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Cargando nóminas...</span>
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
          } catch {
            // Error manejado en el hook
          }
        }}
        employees={mockEmployees}
      />
    </div>
  );
}