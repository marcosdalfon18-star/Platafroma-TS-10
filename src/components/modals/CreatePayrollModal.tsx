'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { PayrollItem } from '@/lib/firestore';
import { calculatePayrollTotals } from '@/services/payroll';

interface CreatePayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PayrollFormData) => void;
  employees?: Array<{ id: string; name: string; position: string; baseSalary?: number }>;
}

export interface PayrollFormData {
  employeeId: string;
  period: {
    month: number;
    year: number;
  };
  baseSalary: number;
  bonuses: PayrollItem[];
  deductions: PayrollItem[];
}

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

const COMMON_BONUSES = [
  'Horas Extra',
  'Bonificación por Desempeño',
  'Comisiones',
  'Subsidio de Transporte',
  'Bonificación Familiar'
];

const COMMON_DEDUCTIONS = [
  'Seguridad Social',
  'Impuesto sobre la Renta',
  'Pensión',
  'Salud',
  'Préstamo Empresa',
  'Fondo de Pensiones'
];

const CreatePayrollModal: React.FC<CreatePayrollModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  employees = []
}) => {
  const [formData, setFormData] = useState<PayrollFormData>({
    employeeId: '',
    period: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    },
    baseSalary: 0,
    bonuses: [],
    deductions: []
  });

  const [newBonus, setNewBonus] = useState({ concept: '', amount: 0 });
  const [newDeduction, setNewDeduction] = useState({ concept: '', amount: 0 });

  // Calcular totales
  const { totalBonuses, totalDeductions, totalGross, totalNet } = calculatePayrollTotals(
    formData.baseSalary,
    formData.bonuses,
    formData.deductions
  );

  const handleEmployeeChange = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setFormData(prev => ({
      ...prev,
      employeeId,
      baseSalary: employee?.baseSalary || 0
    }));
  };

  const addBonus = () => {
    if (newBonus.concept && newBonus.amount > 0) {
      setFormData(prev => ({
        ...prev,
        bonuses: [...prev.bonuses, { ...newBonus, type: 'bonus' as const }]
      }));
      setNewBonus({ concept: '', amount: 0 });
    }
  };

  const addDeduction = () => {
    if (newDeduction.concept && newDeduction.amount > 0) {
      setFormData(prev => ({
        ...prev,
        deductions: [...prev.deductions, { ...newDeduction, type: 'deduction' as const }]
      }));
      setNewDeduction({ concept: '', amount: 0 });
    }
  };

  const removeBonus = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bonuses: prev.bonuses.filter((_, i) => i !== index)
    }));
  };

  const removeDeduction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deductions: prev.deductions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        employeeId: '',
        period: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        },
        baseSalary: 0,
        bonuses: [],
        deductions: []
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Nómina</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Empleado</Label>
              <Select value={formData.employeeId} onValueChange={handleEmployeeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar empleado" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseSalary">Salario Base</Label>
              <Input
                id="baseSalary"
                type="number"
                value={formData.baseSalary}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  baseSalary: parseFloat(e.target.value) || 0
                }))}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Mes</Label>
              <Select 
                value={formData.period.month.toString()} 
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  period: { ...prev.period, month: parseInt(value) }
                }))}
              >
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                type="number"
                value={formData.period.year}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  period: { ...prev.period, year: parseInt(e.target.value) || new Date().getFullYear() }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bonificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Bonificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Concepto"
                    value={newBonus.concept}
                    onChange={(e) => setNewBonus(prev => ({ ...prev, concept: e.target.value }))}
                    list="bonus-suggestions"
                  />
                  <datalist id="bonus-suggestions">
                    {COMMON_BONUSES.map(bonus => (
                      <option key={bonus} value={bonus} />
                    ))}
                  </datalist>
                  <Input
                    type="number"
                    placeholder="Monto"
                    value={newBonus.amount || ''}
                    onChange={(e) => setNewBonus(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-32"
                  />
                  <Button type="button" onClick={addBonus} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.bonuses.map((bonus, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div>
                        <span className="font-medium">{bonus.concept}</span>
                        <Badge variant="outline" className="ml-2 text-green-600">
                          {formatCurrency(bonus.amount)}
                        </Badge>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeBonus(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Deducciones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-600">Deducciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Concepto"
                    value={newDeduction.concept}
                    onChange={(e) => setNewDeduction(prev => ({ ...prev, concept: e.target.value }))}
                    list="deduction-suggestions"
                  />
                  <datalist id="deduction-suggestions">
                    {COMMON_DEDUCTIONS.map(deduction => (
                      <option key={deduction} value={deduction} />
                    ))}
                  </datalist>
                  <Input
                    type="number"
                    placeholder="Monto"
                    value={newDeduction.amount || ''}
                    onChange={(e) => setNewDeduction(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-32"
                  />
                  <Button type="button" onClick={addDeduction} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.deductions.map((deduction, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <div>
                        <span className="font-medium">{deduction.concept}</span>
                        <Badge variant="outline" className="ml-2 text-red-600">
                          {formatCurrency(deduction.amount)}
                        </Badge>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeDeduction(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Resumen de Nómina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Salario Base</p>
                  <p className="text-lg font-semibold">{formatCurrency(formData.baseSalary)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground text-green-600">Total Bonificaciones</p>
                  <p className="text-lg font-semibold text-green-600">+{formatCurrency(totalBonuses)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground text-red-600">Total Deducciones</p>
                  <p className="text-lg font-semibold text-red-600">-{formatCurrency(totalDeductions)}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded">
                  <p className="text-sm text-muted-foreground">Neto a Pagar</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(totalNet)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!formData.employeeId || formData.baseSalary <= 0}>
              Crear Nómina
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePayrollModal;