/**
 * Componente de control horario para empleados
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  LogIn, 
  LogOut, 
  Coffee, 
  Play, 
  Pause,
  User,
  Calendar,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Timestamp } from 'firebase/firestore';

interface TimeClockProps {
  todayAttendance: any;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onStartBreak: () => void;
  onEndBreak: () => void;
  loading: boolean;
  employeeName?: string;
}

export const TimeClock: React.FC<TimeClockProps> = ({
  todayAttendance,
  onCheckIn,
  onCheckOut,
  onStartBreak,
  onEndBreak,
  loading,
  employeeName = 'Usuario'
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date | Timestamp) => {
    const d = date instanceof Timestamp ? date.toDate() : date;
    return d.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date | Timestamp) => {
    const d = date instanceof Timestamp ? date.toDate() : date;
    return d.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (!todayAttendance) return 'bg-gray-500';
    
    switch (todayAttendance.status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'absent': return 'bg-red-500';
      case 'half_day': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    if (!todayAttendance) return 'Sin registros';
    
    switch (todayAttendance.status) {
      case 'present': return 'Presente';
      case 'late': return 'Tarde';
      case 'absent': return 'Ausente';
      case 'half_day': return 'Medio día';
      case 'holiday': return 'Día festivo';
      default: return 'Sin estado';
    }
  };

  const calculateWorkedTime = () => {
    if (!todayAttendance?.checkIn) return '00:00:00';
    
    const checkIn = todayAttendance.checkIn instanceof Timestamp 
      ? todayAttendance.checkIn.toDate() 
      : todayAttendance.checkIn;
    
    const endTime = todayAttendance?.checkOut 
      ? (todayAttendance.checkOut instanceof Timestamp 
          ? todayAttendance.checkOut.toDate() 
          : todayAttendance.checkOut)
      : currentTime;
    
    let totalMs = endTime.getTime() - checkIn.getTime();
    
    // Restar tiempo de descanso si existe
    if (todayAttendance.breakStart && todayAttendance.breakEnd) {
      const breakStart = todayAttendance.breakStart instanceof Timestamp 
        ? todayAttendance.breakStart.toDate() 
        : todayAttendance.breakStart;
      const breakEnd = todayAttendance.breakEnd instanceof Timestamp 
        ? todayAttendance.breakEnd.toDate() 
        : todayAttendance.breakEnd;
      
      totalMs -= (breakEnd.getTime() - breakStart.getTime());
    }
    
    const totalSeconds = Math.floor(totalMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isOnBreak = todayAttendance?.breakStart && !todayAttendance?.breakEnd;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="h-6 w-6" />
          <CardTitle>Control Horario</CardTitle>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-muted-foreground">
            {formatDate(currentTime)}
          </p>
          <div className="text-4xl font-mono font-bold">
            {formatTime(currentTime)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Información del empleado y estado */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{employeeName}</span>
          </div>
          <Badge className={cn(getStatusColor(), 'text-white')}>
            {getStatusText()}
          </Badge>
        </div>

        <Separator />

        {/* Información de la jornada */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Entrada</p>
            <p className="font-mono font-semibold">
              {todayAttendance?.checkIn 
                ? formatTime(todayAttendance.checkIn)
                : '--:--:--'
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Salida</p>
            <p className="font-mono font-semibold">
              {todayAttendance?.checkOut 
                ? formatTime(todayAttendance.checkOut)
                : '--:--:--'
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Descanso</p>
            <p className="font-mono font-semibold">
              {todayAttendance?.breakStart && todayAttendance?.breakEnd
                ? `${formatTime(todayAttendance.breakStart)} - ${formatTime(todayAttendance.breakEnd)}`
                : isOnBreak 
                  ? `${formatTime(todayAttendance.breakStart)} - Activo`
                  : '--:-- - --:--'
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tiempo trabajado</p>
            <p className="font-mono font-semibold text-green-600">
              {calculateWorkedTime()}
            </p>
          </div>
        </div>

        <Separator />

        {/* Botones de control */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={onCheckIn}
            disabled={loading || (todayAttendance?.checkIn && !todayAttendance?.checkOut)}
            variant={todayAttendance?.checkIn ? 'outline' : 'default'}
            size="lg"
            className="flex flex-col gap-1 h-auto py-3"
          >
            <LogIn className="h-5 w-5" />
            <span className="text-xs">Entrada</span>
          </Button>

          <Button
            onClick={onCheckOut}
            disabled={loading || !todayAttendance?.checkIn || todayAttendance?.checkOut}
            variant={todayAttendance?.checkOut ? 'outline' : 'default'}
            size="lg"
            className="flex flex-col gap-1 h-auto py-3"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs">Salida</span>
          </Button>

          <Button
            onClick={onStartBreak}
            disabled={loading || !todayAttendance?.checkIn || todayAttendance?.checkOut || isOnBreak}
            variant={isOnBreak ? 'outline' : 'secondary'}
            size="lg"
            className="flex flex-col gap-1 h-auto py-3"
          >
            <Coffee className="h-5 w-5" />
            <span className="text-xs">Iniciar Descanso</span>
          </Button>

          <Button
            onClick={onEndBreak}
            disabled={loading || !isOnBreak}
            variant={todayAttendance?.breakEnd ? 'outline' : 'secondary'}
            size="lg"
            className="flex flex-col gap-1 h-auto py-3"
          >
            <Play className="h-5 w-5" />
            <span className="text-xs">Fin Descanso</span>
          </Button>
        </div>

        {/* Información adicional */}
        {todayAttendance && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="h-4 w-4" />
              <span className="text-sm font-medium">Resumen del día</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              {todayAttendance.totalHours && (
                <p>Horas totales: {todayAttendance.totalHours.toFixed(2)} horas</p>
              )}
              {todayAttendance.notes && (
                <p>Notas: {todayAttendance.notes}</p>
              )}
            </div>
          </div>
        )}

        {/* Indicador de estado en tiempo real */}
        <div className="flex justify-center">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
            isOnBreak ? "bg-yellow-100 text-yellow-800" :
            todayAttendance?.checkIn && !todayAttendance?.checkOut ? "bg-green-100 text-green-800" :
            "bg-gray-100 text-gray-800"
          )}>
            {isOnBreak && <Pause className="h-3 w-3" />}
            {todayAttendance?.checkIn && !todayAttendance?.checkOut && !isOnBreak && (
              <Play className="h-3 w-3" />
            )}
            <span>
              {isOnBreak ? "En descanso" :
               todayAttendance?.checkIn && !todayAttendance?.checkOut ? "Trabajando" :
               "Fuera del horario laboral"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};