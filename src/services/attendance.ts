/**
 * Servicio para gestionar asistencias y control horario en Firestore
 */

import { where, orderBy, Timestamp } from 'firebase/firestore';
import { 
  Attendance, 
  COLLECTIONS, 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  getDocumentsByQuery, 
  getDocumentById 
} from '@/lib/firestore';

export interface CreateAttendanceInput {
  employeeId: string;
  companyId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  breakStart?: Date;
  breakEnd?: Date;
  notes?: string;
}

export interface UpdateAttendanceInput {
  checkIn?: Date;
  checkOut?: Date;
  breakStart?: Date;
  breakEnd?: Date;
  totalHours?: number;
  status?: "present" | "absent" | "late" | "half_day" | "holiday";
  notes?: string;
}

/**
 * Calcular horas trabajadas
 */
export const calculateWorkingHours = (
  checkIn?: Timestamp | Date,
  checkOut?: Timestamp | Date,
  breakStart?: Timestamp | Date,
  breakEnd?: Timestamp | Date
): number => {
  if (!checkIn || !checkOut) return 0;

  const startTime = checkIn instanceof Timestamp ? checkIn.toDate() : checkIn;
  const endTime = checkOut instanceof Timestamp ? checkOut.toDate() : checkOut;
  
  let totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  
  // Restar tiempo de descanso si existe
  if (breakStart && breakEnd) {
    const breakStartTime = breakStart instanceof Timestamp ? breakStart.toDate() : breakStart;
    const breakEndTime = breakEnd instanceof Timestamp ? breakEnd.toDate() : breakEnd;
    const breakMinutes = (breakEndTime.getTime() - breakStartTime.getTime()) / (1000 * 60);
    totalMinutes -= breakMinutes;
  }
  
  return Math.max(0, totalMinutes / 60); // Convertir a horas
};

/**
 * Determinar el estado de asistencia
 */
export const determineAttendanceStatus = (
  checkIn?: Timestamp | Date,
  checkOut?: Timestamp | Date,
  expectedStartTime: string = "09:00" // Hora esperada en formato HH:MM
): "present" | "absent" | "late" | "half_day" => {
  if (!checkIn) return "absent";
  
  const checkInTime = checkIn instanceof Timestamp ? checkIn.toDate() : checkIn;
  const [expectedHour, expectedMinute] = expectedStartTime.split(':').map(Number);
  
  const expectedStart = new Date(checkInTime);
  expectedStart.setHours(expectedHour, expectedMinute, 0, 0);
  
  // Más de 15 minutos tarde = tarde
  const lateThresholdMs = 15 * 60 * 1000;
  if (checkInTime.getTime() > expectedStart.getTime() + lateThresholdMs) {
    return "late";
  }
  
  // Si no hay checkout o trabajó menos de 4 horas = medio día
  if (!checkOut) {
    const now = new Date();
    const hoursWorked = calculateWorkingHours(checkIn, now);
    return hoursWorked < 4 ? "half_day" : "present";
  }
  
  const totalHours = calculateWorkingHours(checkIn, checkOut);
  return totalHours < 4 ? "half_day" : "present";
};

/**
 * Registrar entrada (check-in)
 */
export const checkIn = async (employeeId: string, companyId: string): Promise<string> => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Verificar si ya existe un registro para hoy
  const existingAttendance = await getAttendanceByEmployeeAndDate(employeeId, today);
  
  if (existingAttendance && existingAttendance.checkIn) {
    throw new Error('Ya has registrado tu entrada para hoy');
  }
  
  const status = determineAttendanceStatus(now);
  
  if (existingAttendance) {
    // Actualizar registro existente
    await updateAttendance(existingAttendance.id, {
      checkIn: now,
      status
    });
    return existingAttendance.id;
  } else {
    // Crear nuevo registro
    return await createAttendance({
      employeeId,
      companyId,
      date: today,
      checkIn: now
    });
  }
};

/**
 * Registrar salida (check-out)
 */
export const checkOut = async (employeeId: string, companyId: string): Promise<void> => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const existingAttendance = await getAttendanceByEmployeeAndDate(employeeId, today);
  
  if (!existingAttendance || !existingAttendance.checkIn) {
    throw new Error('Debes registrar tu entrada primero');
  }
  
  if (existingAttendance.checkOut) {
    throw new Error('Ya has registrado tu salida para hoy');
  }
  
  const totalHours = calculateWorkingHours(
    existingAttendance.checkIn,
    now,
    existingAttendance.breakStart,
    existingAttendance.breakEnd
  );
  
  const status = determineAttendanceStatus(existingAttendance.checkIn, now);
  
  await updateAttendance(existingAttendance.id, {
    checkOut: now,
    totalHours,
    status
  });
};

/**
 * Iniciar descanso
 */
export const startBreak = async (employeeId: string): Promise<void> => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const existingAttendance = await getAttendanceByEmployeeAndDate(employeeId, today);
  
  if (!existingAttendance || !existingAttendance.checkIn) {
    throw new Error('Debes registrar tu entrada primero');
  }
  
  if (existingAttendance.breakStart) {
    throw new Error('Ya has iniciado tu descanso');
  }
  
  await updateAttendance(existingAttendance.id, {
    breakStart: now
  });
};

/**
 * Terminar descanso
 */
export const endBreak = async (employeeId: string): Promise<void> => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const existingAttendance = await getAttendanceByEmployeeAndDate(employeeId, today);
  
  if (!existingAttendance || !existingAttendance.breakStart) {
    throw new Error('Debes iniciar tu descanso primero');
  }
  
  if (existingAttendance.breakEnd) {
    throw new Error('Ya has terminado tu descanso');
  }
  
  await updateAttendance(existingAttendance.id, {
    breakEnd: now
  });
};

/**
 * Crear registro de asistencia
 */
export const createAttendance = async (data: CreateAttendanceInput): Promise<string> => {
  const attendance = {
    ...data,
    date: Timestamp.fromDate(data.date),
    checkIn: data.checkIn ? Timestamp.fromDate(data.checkIn) : undefined,
    checkOut: data.checkOut ? Timestamp.fromDate(data.checkOut) : undefined,
    breakStart: data.breakStart ? Timestamp.fromDate(data.breakStart) : undefined,
    breakEnd: data.breakEnd ? Timestamp.fromDate(data.breakEnd) : undefined,
    totalHours: calculateWorkingHours(data.checkIn, data.checkOut, data.breakStart, data.breakEnd),
    status: determineAttendanceStatus(data.checkIn, data.checkOut),
  };

  const docRef = await createDocument('ATTENDANCES', attendance);
  return docRef.id;
};

/**
 * Actualizar registro de asistencia
 */
export const updateAttendance = async (
  id: string, 
  data: UpdateAttendanceInput
): Promise<void> => {
  const updateData: any = { ...data };
  
  // Convertir fechas a Timestamp
  if (data.checkIn) {
    updateData.checkIn = Timestamp.fromDate(data.checkIn);
  }
  if (data.checkOut) {
    updateData.checkOut = Timestamp.fromDate(data.checkOut);
  }
  if (data.breakStart) {
    updateData.breakStart = Timestamp.fromDate(data.breakStart);
  }
  if (data.breakEnd) {
    updateData.breakEnd = Timestamp.fromDate(data.breakEnd);
  }

  await updateDocument('ATTENDANCES', id, updateData);
};

/**
 * Obtener asistencia por ID
 */
export const getAttendanceById = async (id: string): Promise<Attendance | null> => {
  return await getDocumentById('ATTENDANCES', id) as Attendance | null;
};

/**
 * Obtener asistencia de un empleado en una fecha específica
 */
export const getAttendanceByEmployeeAndDate = async (
  employeeId: string, 
  date: Date
): Promise<Attendance | null> => {
  const startOfDateTimestamp = Timestamp.fromDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  const endOfDateTimestamp = Timestamp.fromDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
  
  const constraints: any[] = [
    where('employeeId', '==', employeeId),
    where('date', '>=', startOfDateTimestamp),
    where('date', '<', endOfDateTimestamp)
  ];
  
  const attendances = await getDocumentsByQuery('ATTENDANCES', constraints) as Attendance[];

  return attendances.length > 0 ? attendances[0] : null;
};

/**
 * Obtener asistencias por empleado
 */
export const getAttendancesByEmployee = async (
  employeeId: string,
  startDate?: Date,
  endDate?: Date
): Promise<Attendance[]> => {
  const constraints: any[] = [where('employeeId', '==', employeeId)];
  
  if (startDate) {
    constraints.push(where('date', '>=', Timestamp.fromDate(startDate)));
  }
  if (endDate) {
    constraints.push(where('date', '<=', Timestamp.fromDate(endDate)));
  }
  
  constraints.push(orderBy('date', 'desc'));
  
  return await getDocumentsByQuery('ATTENDANCES', constraints) as Attendance[];
};

/**
 * Obtener asistencias por empresa
 */
export const getAttendancesByCompany = async (
  companyId: string,
  startDate?: Date,
  endDate?: Date
): Promise<Attendance[]> => {
  const constraints: any[] = [where('companyId', '==', companyId)];
  
  if (startDate) {
    constraints.push(where('date', '>=', Timestamp.fromDate(startDate)));
  }
  if (endDate) {
    constraints.push(where('date', '<=', Timestamp.fromDate(endDate)));
  }
  
  constraints.push(orderBy('date', 'desc'));
  
  return await getDocumentsByQuery('ATTENDANCES', constraints) as Attendance[];
};

/**
 * Obtener estadísticas de asistencia
 */
export const getAttendanceStats = async (
  companyId: string,
  startDate: Date,
  endDate: Date
) => {
  const attendances = await getAttendancesByCompany(companyId, startDate, endDate);
  
  const stats = {
    totalRecords: attendances.length,
    present: attendances.filter(a => a.status === 'present').length,
    absent: attendances.filter(a => a.status === 'absent').length,
    late: attendances.filter(a => a.status === 'late').length,
    halfDay: attendances.filter(a => a.status === 'half_day').length,
    holiday: attendances.filter(a => a.status === 'holiday').length,
    averageHours: attendances.reduce((sum, a) => sum + (a.totalHours || 0), 0) / attendances.length || 0,
    totalHours: attendances.reduce((sum, a) => sum + (a.totalHours || 0), 0)
  };

  return stats;
};