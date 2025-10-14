/**
 * Modal para crear registros de asistencia manual
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Plus, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Employee } from '@/lib/firestore';
import { CreateAttendanceInput } from '@/services/attendance';

const attendanceSchema = z.object({
  employeeId: z.string().min(1, 'Debe seleccionar un empleado'),
  date: z.date({
    required_error: 'La fecha es requerida'
  }),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  breakStart: z.string().optional(),
  breakEnd: z.string().optional(),
  status: z.enum(['present', 'absent', 'late', 'half_day', 'holiday']),
  notes: z.string().optional()
});

type AttendanceFormData = z.infer<typeof attendanceSchema>;

interface CreateAttendanceModalProps {
  employees: Employee[];
  onCreateAttendance: (data: CreateAttendanceInput) => Promise<void>;
  loading?: boolean;
  trigger?: React.ReactNode;
}

export const CreateAttendanceModal: React.FC<CreateAttendanceModalProps> = ({
  employees,
  onCreateAttendance,
  loading = false,
  trigger
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      date: new Date(),
      status: 'present'
    }
  });

  const parseTimeString = (timeStr: string, date: Date): Date | undefined => {
    if (!timeStr) return undefined;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return undefined;
    
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  const handleSubmit = async (data: AttendanceFormData) => {
    try {
      const attendanceData: CreateAttendanceInput = {
        employeeId: data.employeeId,
        companyId: employees.find(e => e.id === data.employeeId)?.companyId || '',
        date: data.date,
        checkIn: parseTimeString(data.checkIn || '', data.date),
        checkOut: parseTimeString(data.checkOut || '', data.date),
        breakStart: parseTimeString(data.breakStart || '', data.date),
        breakEnd: parseTimeString(data.breakEnd || '', data.date),
        notes: data.notes
      };

      await onCreateAttendance(attendanceData);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Error creating attendance:', error);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      present: 'Presente',
      absent: 'Ausente',
      late: 'Tarde',
      half_day: 'Medio día',
      holiday: 'Día festivo'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
      half_day: 'bg-blue-100 text-blue-800',
      holiday: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Registro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Crear Registro de Asistencia
          </DialogTitle>
          <DialogDescription>
            Cree un nuevo registro de asistencia manual para un empleado
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Empleado */}
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empleado *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar empleado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['present', 'absent', 'late', 'half_day', 'holiday'].map((status) => (
                        <SelectItem key={status} value={status}>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(status)}>
                              {getStatusLabel(status)}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Horarios */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de entrada</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="09:00"
                      />
                    </FormControl>
                    <FormDescription>
                      Formato: HH:MM (24h)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de salida</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="17:00"
                      />
                    </FormControl>
                    <FormDescription>
                      Formato: HH:MM (24h)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Descansos */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="breakStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inicio de descanso</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="12:00"
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="breakEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fin de descanso</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="13:00"
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notas */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Notas adicionales sobre la asistencia..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Información adicional opcional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Registro'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};