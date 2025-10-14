
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Cpu, 
  Bot, 
  MessageSquare, 
  Settings, 
  Play, 
  Pause, 
  PlusCircle, 
  Edit,
  Eye,
  Workflow,
  Brain,
  BarChart3,
  MessageCircle,
  ArrowUpRight,
  Target,
  TrendingUp,
  Sparkles,
  Activity
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const mockAgents = [
  {
    id: '1',
    name: 'Asistente de Atención al Cliente',
    type: 'Chatbot',
    status: 'active',
    description: 'Bot especializado en resolver consultas de clientes y proporcionar soporte básico',
    interactions: 1247,
    successRate: 87.5,
    avgResponseTime: 2.3,
    lastActive: '2024-10-13T10:30:00',
    training: 'customer-support',
    language: 'Español',
    channels: ['Web Chat', 'WhatsApp', 'Email']
  },
  {
    id: '2',
    name: 'Asistente de RRHH',
    type: 'Workflow Assistant',
    status: 'active',
    description: 'Automatiza procesos de recursos humanos como onboarding y gestión de permisos',
    interactions: 324,
    successRate: 92.1,
    avgResponseTime: 1.8,
    lastActive: '2024-10-13T09:15:00',
    training: 'hr-processes',
    language: 'Español',
    channels: ['Slack', 'Email', 'Internal Portal']
  },
  {
    id: '3',
    name: 'Analizador de Documentos',
    type: 'Document Processor',
    status: 'training',
    description: 'Procesa y extrae información relevante de documentos empresariales',
    interactions: 89,
    successRate: 78.9,
    avgResponseTime: 15.7,
    lastActive: '2024-10-12T16:45:00',
    training: 'document-analysis',
    language: 'Multiidioma',
    channels: ['File Upload', 'Email Attachments']
  },
  {
    id: '4',
    name: 'Predictor de Ventas',
    type: 'Analytics Assistant',
    status: 'paused',
    description: 'Analiza patrones de venta y predice tendencias futuras',
    interactions: 156,
    successRate: 85.2,
    avgResponseTime: 8.4,
    lastActive: '2024-10-10T14:20:00',
    training: 'sales-analytics',
    language: 'Español',
    channels: ['Dashboard', 'Reports', 'API']
  }
];

const mockWorkflows = [
  {
    id: '1',
    name: 'Onboarding Automático',
    description: 'Proceso completo de incorporación de nuevos empleados',
    steps: 8,
    completedRuns: 45,
    status: 'active',
    avgDuration: '2.5 horas',
    successRate: 94.2
  },
  {
    id: '2',
    name: 'Procesamiento de Facturas',
    description: 'Extracción y validación automática de datos de facturas',
    steps: 5,
    completedRuns: 189,
    status: 'active',
    avgDuration: '3.2 min',
    successRate: 89.7
  },
  {
    id: '3',
    name: 'Seguimiento de Leads',
    description: 'Clasificación y asignación automática de leads de marketing',
    steps: 6,
    completedRuns: 267,
    status: 'active',
    avgDuration: '1.8 min',
    successRate: 91.4
  }
];

const mockMetrics = {
  totalInteractions: 1816,
  activeAgents: 3,
  avgSuccessRate: 87.9,
  totalTimesSaved: 124.5,
  automatedTasks: 501,
  costSavings: 15420
};

export default function AiAgentsPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentType, setNewAgentType] = useState("chatbot");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'training': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Chatbot': return <MessageSquare className="h-4 w-4" />;
      case 'Workflow Assistant': return <Workflow className="h-4 w-4" />;
      case 'Document Processor': return <Brain className="h-4 w-4" />;
      case 'Analytics Assistant': return <BarChart3 className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Cpu className="h-8 w-8 text-primary" />
              Agentes de Inteligencia Artificial
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestión y configuración de asistentes IA, chatbots y automatización inteligente
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Agente
            </Button>
            <Button variant="outline">
              <Workflow className="mr-2 h-4 w-4" />
              Crear Flujo
            </Button>
          </div>
        </header>

        {/* Métricas Generales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interacciones Totales</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mockMetrics.totalInteractions)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +23% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agentes Activos</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.activeAgents}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +1 nuevo esta semana
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.avgSuccessRate}%</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2.1% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ahorro Estimado</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockMetrics.costSavings)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{mockMetrics.totalTimesSaved}h ahorradas
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Contenido */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="workflows">Automatización</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Agentes Más Activos */}
              <Card>
                <CardHeader>
                  <CardTitle>Agentes Más Activos</CardTitle>
                  <CardDescription>Rendimiento de tus mejores asistentes IA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAgents.filter(a => a.status === 'active').slice(0, 3).map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getTypeIcon(agent.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge className={getStatusColor(agent.status)}>Activo</Badge>
                            <span>•</span>
                            <span>{agent.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{agent.successRate}%</div>
                        <div className="text-sm text-muted-foreground">{agent.interactions} interacciones</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Flujos de Trabajo Recientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Automatización Activa</CardTitle>
                  <CardDescription>Flujos de trabajo en ejecución</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockWorkflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{workflow.name}</h4>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{workflow.steps} pasos</Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {workflow.successRate}% éxito
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{workflow.completedRuns}</div>
                        <div className="text-sm text-muted-foreground">ejecuciones</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Panel de Control Rápido */}
            <Card>
              <CardHeader>
                <CardTitle>Panel de Control</CardTitle>
                <CardDescription>Controles rápidos para gestión de agentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Sparkles className="h-6 w-6" />
                    <span>Entrenar Agentes</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Activity className="h-6 w-6" />
                    <span>Monitorear Actividad</span>
                  </Button>
                  <Button className="h-20 flex-col gap-2" variant="outline">
                    <Settings className="h-6 w-6" />
                    <span>Configurar APIs</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Agentes IA</CardTitle>
                  <CardDescription>Administra todos tus asistentes inteligentes</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Crear Agente
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Interacciones</TableHead>
                      <TableHead>Éxito</TableHead>
                      <TableHead>Tiempo Respuesta</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAgents.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              {getTypeIcon(agent.type)}
                            </div>
                            <div>
                              <div className="font-medium">{agent.name}</div>
                              <div className="text-sm text-muted-foreground">{agent.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{agent.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(agent.status)}>
                            {agent.status === 'active' ? 'Activo' : 
                             agent.status === 'training' ? 'Entrenando' :
                             agent.status === 'paused' ? 'Pausado' : agent.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatNumber(agent.interactions)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={agent.successRate} className="w-16" />
                            <span className="text-sm font-medium">{agent.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{agent.avgResponseTime}s</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              {agent.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Panel de Creación Rápida */}
            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Agente</CardTitle>
                <CardDescription>Configuración rápida para un nuevo asistente IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Nombre del Agente</Label>
                    <Input
                      id="agent-name"
                      placeholder="Ej: Asistente de Ventas"
                      value={newAgentName}
                      onChange={(e) => setNewAgentName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-type">Tipo de Agente</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newAgentType}
                      onChange={(e) => setNewAgentType(e.target.value)}
                    >
                      <option value="chatbot">Chatbot</option>
                      <option value="workflow">Asistente de Flujo</option>
                      <option value="processor">Procesador de Documentos</option>
                      <option value="analytics">Asistente de Analytics</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent-description">Descripción</Label>
                  <Textarea
                    id="agent-description"
                    placeholder="Describe las funciones de este agente..."
                    rows={3}
                  />
                </div>
                <Button>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Crear y Entrenar Agente
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Automatización y Flujos de Trabajo</CardTitle>
                  <CardDescription>Gestiona procesos automatizados con IA</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nuevo Flujo
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Flujo de Trabajo</TableHead>
                      <TableHead>Pasos</TableHead>
                      <TableHead>Ejecuciones</TableHead>
                      <TableHead>Tasa de Éxito</TableHead>
                      <TableHead>Duración Promedio</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWorkflows.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{workflow.name}</div>
                            <div className="text-sm text-muted-foreground">{workflow.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{workflow.steps} pasos</Badge>
                        </TableCell>
                        <TableCell>{workflow.completedRuns}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={workflow.successRate} className="w-16" />
                            <span className="text-sm font-medium">{workflow.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{workflow.avgDuration}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(workflow.status)}>
                            {workflow.status === 'active' ? 'Activo' : workflow.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento por Tipo de Agente</CardTitle>
                  <CardDescription>Análisis comparativo de eficiencia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span>Chatbots</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">87.5%</div>
                        <div className="text-sm text-muted-foreground">tasa de éxito</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Workflow className="h-4 w-4 text-green-500" />
                        <span>Asistentes de Flujo</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">92.1%</div>
                        <div className="text-sm text-muted-foreground">tasa de éxito</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-500" />
                        <span>Procesadores</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">78.9%</div>
                        <div className="text-sm text-muted-foreground">tasa de éxito</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Eficiencia</CardTitle>
                  <CardDescription>Indicadores clave de rendimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockMetrics.totalTimesSaved}h</div>
                      <div className="text-sm text-muted-foreground">Tiempo Ahorrado</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockMetrics.automatedTasks}</div>
                      <div className="text-sm text-muted-foreground">Tareas Automatizadas</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">2.8s</div>
                      <div className="text-sm text-muted-foreground">Tiempo Respuesta Promedio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Actividad */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad de Agentes IA</CardTitle>
                <CardDescription>Interacciones y rendimiento en tiempo real</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12 border-2 border-dashed rounded-lg">
                  <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Dashboard de Actividad</h3>
                  <p className="text-muted-foreground">
                    Visualización en tiempo real de la actividad de todos los agentes IA
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
