
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  CalendarIcon, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Search,
  Star,
  MessageSquare,
  Edit,
  Trash2,
  Play,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useInterviews } from '@/hooks/useInterviews';
import { Interview, InterviewStatus } from '@/services/interviews';
import CreateInterviewModal from '@/components/modals/CreateInterviewModal';
import EvaluateInterviewModal from '@/components/modals/EvaluateInterviewModal';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const InterviewsPageContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    interviews,
    candidates,
    stats,
    loading,
    createInterview,
    updateInterviewStatus,
    addEvaluation,
    deleteInterview,
    getTodaysInterviews,
    getUpcomingInterviews
  } = useInterviews();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEvaluateModalOpen, setIsEvaluateModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Definir permisos basados en roles
  const permissions = {
    canCreate: user?.role === 'consultor' || user?.role === 'empresario',
    canEdit: user?.role === 'consultor' || user?.role === 'empresario',
    canDelete: user?.role === 'consultor',
    canEvaluate: user?.role === 'consultor' || user?.role === 'empresario',
    canViewAll: user?.role === 'consultor' || user?.role === 'empresario',
    canManageProcess: user?.role === 'consultor',
    isReadOnly: user?.role === 'empleado' || user?.role === 'gestor'
  };

  const handleCreateInterview = async (interviewData: any) => {
    if (!permissions.canCreate) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo Consultoras y Empresarios pueden crear entrevistas",
        variant: "destructive"
      });
      return;
    }
    await createInterview(interviewData);
  };

  const handleEvaluateInterview = async (
    evaluations: any[], 
    finalScore: number, 
    decision: 'approved' | 'rejected' | 'pending',
    notes?: string
  ) => {
    if (!permissions.canEvaluate) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo Consultoras y Empresarios pueden evaluar entrevistas",
        variant: "destructive"
      });
      return;
    }
    if (selectedInterview?.id) {
      await addEvaluation(selectedInterview.id, evaluations, finalScore, decision, notes);
    }
  };

  const handleStatusChange = async (interviewId: string, status: InterviewStatus) => {
    if (!permissions.canEdit) {
      toast({
        title: "Permisos insuficientes", 
        description: "No tienes permisos para modificar el estado de las entrevistas",
        variant: "destructive"
      });
      return;
    }
    await updateInterviewStatus(interviewId, status);
  };

  const handleDeleteInterview = async (interviewId: string) => {
    if (!permissions.canDelete) {
      toast({
        title: "Permisos insuficientes",
        description: "Solo las Consultoras pueden eliminar entrevistas",
        variant: "destructive"
      });
      return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar esta entrevista?')) {
      await deleteInterview(interviewId);
    }
  };

  // Filtrar entrevistas por búsqueda
  const filteredInterviews = interviews.filter(interview =>
    interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.interviewerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar por tab activo
  const getFilteredByTab = () => {
    switch (activeTab) {
      case 'today':
        return getTodaysInterviews();
      case 'upcoming':
        return getUpcomingInterviews();
      case 'scheduled':
        return filteredInterviews.filter(i => i.status === 'scheduled');
      case 'completed':
        return filteredInterviews.filter(i => i.status === 'completed');
      case 'pending-evaluation':
        return filteredInterviews.filter(i => i.status === 'completed' && !i.evaluations?.length);
      default:
        return filteredInterviews;
    }
  };

  const getStatusColor = (status: InterviewStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: InterviewStatus) => {
    switch (status) {
      case 'scheduled': return 'Programada';
      case 'in-progress': return 'En Progreso';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      case 'rescheduled': return 'Reprogramada';
      default: return status;
    }
  };

  const getDecisionBadge = (decision?: string) => {
    switch (decision) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rechazado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Sin evaluar</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {user?.role === 'consultor' ? 'Gestión de Entrevistas' : 
             user?.role === 'empresario' ? 'Entrevistas de la Empresa' : 
             'Consulta de Entrevistas'}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'consultor' ? 'Programa, gestiona y evalúa entrevistas de candidatos' :
             user?.role === 'empresario' ? 'Revisa y participa en el proceso de entrevistas' :
             'Consulta información sobre entrevistas programadas'}
          </p>
          
          {/* Indicador de rol y permisos */}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={user?.role === 'consultor' ? 'default' : 'secondary'}>
              {user?.role === 'consultor' ? '👩‍💼 Consultora' :
               user?.role === 'empresario' ? '🏢 Empresario' :
               user?.role === 'empleado' ? '👨‍💻 Empleado' : 
               user?.role === 'gestor' ? '👔 Gestor' : 'Usuario'}
            </Badge>
            {permissions.isReadOnly && (
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                👁️ Solo Lectura
              </Badge>
            )}
          </div>
        </div>
        
        {permissions.canCreate && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Entrevista
          </Button>
        )}
        
        {permissions.isReadOnly && (
          <div className="text-sm text-muted-foreground bg-orange-50 p-3 rounded-lg border border-orange-200">
            <AlertCircle className="inline h-4 w-4 mr-2 text-orange-600" />
            Contacta a la Consultora para gestionar entrevistas
          </div>
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programadas</CardTitle>
            <CalendarIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazados</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.averageScore.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por candidato, posición o entrevistador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs de filtros */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="today">Hoy</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="scheduled">Programadas</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
          <TabsTrigger value="pending-evaluation">Pendientes Evaluación</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entrevistas</CardTitle>
              <CardDescription>
                {getFilteredByTab().length} entrevista(s) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidato</TableHead>
                    <TableHead>Posición</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Entrevistador</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Decisión</TableHead>
                    <TableHead>Puntuación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredByTab().map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{interview.candidateName}</div>
                          <div className="text-sm text-muted-foreground">
                            {interview.candidateEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{interview.position}</TableCell>
                      <TableCell>
                        <div>
                          <div>{format(interview.date, "PPP", { locale: es })}</div>
                          <div className="text-sm text-muted-foreground">
                            {interview.time} • {interview.duration}min
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{interview.interviewerName}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(interview.status)}>
                          {getStatusText(interview.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getDecisionBadge(interview.decision)}
                      </TableCell>
                      <TableCell>
                        {interview.finalScore ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{interview.finalScore.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {interview.status === 'scheduled' && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(interview.id!, 'in-progress')}
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Iniciar Entrevista
                              </DropdownMenuItem>
                            )}
                            
                            {(interview.status === 'in-progress' || interview.status === 'completed') && (
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedInterview(interview);
                                  setIsEvaluateModalOpen(true);
                                }}
                              >
                                <Star className="mr-2 h-4 w-4" />
                                {interview.evaluations?.length ? 'Ver/Editar Evaluación' : 'Evaluar'}
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedInterview(interview);
                                setIsCreateModalOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              onClick={() => handleDeleteInterview(interview.id!)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {getFilteredByTab().length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                        No se encontraron entrevistas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modales */}
      <CreateInterviewModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedInterview(null);
        }}
        onSubmit={handleCreateInterview}
        candidates={candidates}
        interview={selectedInterview || undefined}
        loading={loading}
      />

      {selectedInterview && (
        <EvaluateInterviewModal
          isOpen={isEvaluateModalOpen}
          onClose={() => {
            setIsEvaluateModalOpen(false);
            setSelectedInterview(null);
          }}
          onSubmit={handleEvaluateInterview}
          interview={selectedInterview}
          loading={loading}
        />
      )}
    </div>
  );
};

export default function InterviewsPage() {
  return (
    <ProtectedRoute allowedRoles={["consultor", "empresario"]}>
      <InterviewsPageContent />
    </ProtectedRoute>
  );
}
