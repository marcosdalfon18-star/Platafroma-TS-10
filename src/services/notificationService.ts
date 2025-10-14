/**
 * Hook personalizado para gestionar notificaciones push de eventos importantes
 */

import { usePushNotifications } from '@/hooks/usePushNotifications';

export interface NotificationEvent {
  type: 'interview_scheduled' | 'interview_completed' | 'payroll_approved' | 'vacancy_created' | 'deadline_approaching';
  title: string;
  body: string;
  data?: Record<string, unknown>;
  userId?: string;
}

export const useNotificationService = () => {
  const pushNotifications = usePushNotifications();

  const sendEventNotification = async (event: NotificationEvent) => {
    const { permissionStatus, sendTestNotification } = pushNotifications;

    if (permissionStatus === 'granted') {
      sendTestNotification(event.title, event.body);
      console.log(`Notification sent: ${event.title}`);
    } else {
      console.warn('Push notifications not permitted');
    }

    // Aquí se podría integrar con un backend para enviar notificaciones push
    // a través de FCM tokens almacenados en la base de datos
  };

  // Notificaciones específicas para eventos de RRHH
  const notifyInterviewScheduled = async (candidateName: string, date: string, interviewerName: string) => {
    await sendEventNotification({
      type: 'interview_scheduled',
      title: 'Nueva Entrevista Programada',
      body: `Entrevista con ${candidateName} el ${date} por ${interviewerName}`,
      data: { candidateName, date, interviewerName }
    });
  };

  const notifyInterviewCompleted = async (candidateName: string, decision: string) => {
    await sendEventNotification({
      type: 'interview_completed',
      title: 'Entrevista Completada',
      body: `La entrevista de ${candidateName} ha sido completada. Decisión: ${decision}`,
      data: { candidateName, decision }
    });
  };

  const notifyPayrollApproved = async (employeeCount: number, totalAmount: string) => {
    await sendEventNotification({
      type: 'payroll_approved',
      title: 'Nómina Aprobada',
      body: `Se ha aprobado la nómina para ${employeeCount} empleados por un total de ${totalAmount}`,
      data: { employeeCount, totalAmount }
    });
  };

  const notifyVacancyCreated = async (position: string, department: string) => {
    await sendEventNotification({
      type: 'vacancy_created',
      title: 'Nueva Vacante Creada',
      body: `Se ha creado una vacante para ${position} en ${department}`,
      data: { position, department }
    });
  };

  const notifyDeadlineApproaching = async (event: string, daysLeft: number) => {
    await sendEventNotification({
      type: 'deadline_approaching',
      title: 'Fecha Límite Próxima',
      body: `${event} vence en ${daysLeft} días`,
      data: { event, daysLeft }
    });
  };

  return {
    notifyInterviewScheduled,
    notifyInterviewCompleted,
    notifyPayrollApproved,
    notifyVacancyCreated,
    notifyDeadlineApproaching,
    permissionStatus: pushNotifications.permissionStatus,
    requestPermission: pushNotifications.requestPermission
  };
};

export default useNotificationService;