
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShieldCheck, 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Users,
  FileText,
  Settings,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  Clock,
  Database,
  Key,
  Fingerprint,
  Wifi,
  Globe,
  Server,
  HardDrive,
  Zap,
  Bell,
  Flag,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Archive,
  RefreshCw,
  AlertCircle,
  Info,
  CheckSquare,
  X,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const mockSecurityPolicies = [
  {
    id: '1',
    name: 'Política de Contraseñas',
    category: 'Autenticación',
    status: 'active',
    compliance: 95,
    lastUpdated: '2024-10-01',
    description: 'Requisitos mínimos para contraseñas corporativas',
    severity: 'high',
    affectedUsers: 145
  },
  {
    id: '2',
    name: 'Acceso a Datos Sensibles',
    category: 'Protección de Datos',
    status: 'active',
    compliance: 87,
    lastUpdated: '2024-09-15',
    description: 'Controles de acceso para información confidencial',
    severity: 'critical',
    affectedUsers: 89
  },
  {
    id: '3',
    name: 'Uso de Dispositivos Personales',
    category: 'BYOD',
    status: 'draft',
    compliance: 0,
    lastUpdated: '2024-10-10',
    description: 'Normativas para uso de dispositivos personales en el trabajo',
    severity: 'medium',
    affectedUsers: 0
  }
];

const mockAuditLogs = [
  {
    id: '1',
    timestamp: '2024-10-13T10:30:00',
    user: 'Ana García',
    action: 'Login Attempt',
    resource: 'Sistema Principal',
    status: 'success',
    ipAddress: '192.168.1.105',
    location: 'Madrid, España',
    risk: 'low'
  },
  {
    id: '2',
    timestamp: '2024-10-13T09:45:00',
    user: 'Carlos López',
    action: 'Data Export',
    resource: 'Base de Datos Clientes',
    status: 'success',
    ipAddress: '192.168.1.128',
    location: 'Barcelona, España',
    risk: 'medium'
  },
  {
    id: '3',
    timestamp: '2024-10-13T08:20:00',
    user: 'Sistema',
    action: 'Failed Login',
    resource: 'Panel Admin',
    status: 'blocked',
    ipAddress: '203.45.78.123',
    location: 'Desconocida',
    risk: 'high'
  }
];

const mockThreats = [
  {
    id: '1',
    type: 'Intento de Intrusión',
    severity: 'high',
    status: 'investigating',
    timestamp: '2024-10-13T11:15:00',
    source: '203.45.78.123',
    description: 'Múltiples intentos de acceso fallidos detectados',
    affectedSystems: ['Panel Admin', 'Base de Datos'],
    mitigationStatus: 'in-progress'
  },
  {
    id: '2',
    type: 'Malware Detectado',
    severity: 'critical',
    status: 'resolved',
    timestamp: '2024-10-12T15:30:00',
    source: 'Correo Electrónico',
    description: 'Archivo adjunto malicioso interceptado y eliminado',
    affectedSystems: ['Sistema de Email'],
    mitigationStatus: 'completed'
  },
  {
    id: '3',
    type: 'Acceso No Autorizado',
    severity: 'medium',
    status: 'monitoring',
    timestamp: '2024-10-11T14:45:00',
    source: 'VPN Externa',
    description: 'Acceso desde ubicación inusual detectado',
    affectedSystems: ['VPN', 'Archivos Corporativos'],
    mitigationStatus: 'monitoring'
  }
];

const mockCompliance = [
  {
    framework: 'GDPR',
    score: 92,
    status: 'compliant',
    lastAudit: '2024-09-01',
    nextAudit: '2024-12-01',
    requirements: 28,
    completed: 26,
    pending: 2
  },
  {
    framework: 'ISO 27001',
    score: 85,
    status: 'in-progress',
    lastAudit: '2024-08-15',
    nextAudit: '2024-11-15',
    requirements: 35,
    completed: 30,
    pending: 5
  },
  {
    framework: 'SOX',
    score: 78,
    status: 'needs-attention',
    lastAudit: '2024-07-20',
    nextAudit: '2024-10-20',
    requirements: 22,
    completed: 17,
    pending: 5
  }
];

const mockBackups = [
  {
    id: '1',
    name: 'Base de Datos Principal',
    type: 'Database',
    lastBackup: '2024-10-13T06:00:00',
    size: '2.4 GB',
    status: 'success',
    retention: '30 días',
    frequency: 'Diario'
  },
  {
    id: '2',
    name: 'Archivos de Usuario',
    type: 'Files',
    lastBackup: '2024-10-13T02:00:00',
    size: '8.7 GB',
    status: 'success',
    retention: '90 días',
    frequency: 'Diario'
  },
  {
    id: '3',
    name: 'Configuraciones del Sistema',
    type: 'System',
    lastBackup: '2024-10-12T23:00:00',
    size: '156 MB',
    status: 'warning',
    retention: '365 días',
    frequency: 'Semanal'
  }
];

export default function CybersecurityPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
      case 'compliant':
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
      case 'in-progress':
      case 'investigating':
      case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
      case 'blocked':
      case 'critical':
      case 'needs-attention': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <Flag className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              Centro de Ciberseguridad
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestión integral de seguridad, políticas y cumplimiento normativo
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Política
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Informe de Seguridad
            </Button>
          </div>
        </header>

        {/* Métricas de Seguridad */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado de Seguridad</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Seguro</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                95% de cumplimiento
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amenazas Activas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <div className="flex items-center text-xs text-yellow-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -1 vs semana anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Políticas Activas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSecurityPolicies.filter(p => p.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">de {mockSecurityPolicies.length} políticas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Últimos Backups</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBackups.filter(b => b.status === 'success').length}</div>
              <p className="text-xs text-muted-foreground">exitosos hoy</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Contenido */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="policies">Políticas</TabsTrigger>
            <TabsTrigger value="threats">Amenazas</TabsTrigger>
            <TabsTrigger value="audit">Auditoría</TabsTrigger>
            <TabsTrigger value="compliance">Cumplimiento</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Estado de Seguridad */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado General de Seguridad</CardTitle>
                  <CardDescription>Vista general del nivel de protección</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Firewall</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Activo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-green-500" />
                        <span>Encriptación</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">SSL/TLS</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-yellow-500" />
                        <span>Autenticación 2FA</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Parcial</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-green-500" />
                        <span>Monitoreo</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">24/7</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenazas Recientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenazas Recientes</CardTitle>
                  <CardDescription>Últimas detecciones de seguridad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockThreats.slice(0, 3).map((threat) => (
                    <div key={threat.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getSeverityIcon(threat.severity)}
                        <div>
                          <h4 className="font-medium text-sm">{threat.type}</h4>
                          <p className="text-xs text-muted-foreground">{threat.description}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(threat.status)}>
                        {threat.status === 'investigating' ? 'Investigando' :
                         threat.status === 'resolved' ? 'Resuelto' :
                         threat.status === 'monitoring' ? 'Monitoreando' : threat.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Panel de Cumplimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Estado de Cumplimiento Normativo</CardTitle>
                <CardDescription>Progreso en marcos regulatorios principales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {mockCompliance.map((comp) => (
                    <div key={comp.framework} className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">{comp.framework}</h3>
                      <div className="text-3xl font-bold mb-2" style={{ 
                        color: comp.score >= 90 ? '#16a34a' : comp.score >= 70 ? '#eab308' : '#dc2626' 
                      }}>
                        {comp.score}%
                      </div>
                      <Progress value={comp.score} className="mb-2" />
                      <Badge className={getStatusColor(comp.status)}>
                        {comp.status === 'compliant' ? 'Cumple' :
                         comp.status === 'in-progress' ? 'En Progreso' :
                         comp.status === 'needs-attention' ? 'Requiere Atención' : comp.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Políticas de Seguridad</CardTitle>
                  <CardDescription>Gestión de normativas y procedimientos de seguridad</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Política
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Política</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Cumplimiento</TableHead>
                      <TableHead>Usuarios Afectados</TableHead>
                      <TableHead>Última Actualización</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSecurityPolicies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{policy.name}</div>
                            <div className="text-sm text-muted-foreground">{policy.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{policy.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(policy.status)}>
                            {policy.status === 'active' ? 'Activa' : 
                             policy.status === 'draft' ? 'Borrador' : policy.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={policy.compliance} className="w-16" />
                            <span className="text-sm font-medium">{policy.compliance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{policy.affectedUsers}</TableCell>
                        <TableCell>{formatTimestamp(policy.lastUpdated)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-3 w-3" />
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

          <TabsContent value="threats" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Centro de Amenazas</CardTitle>
                  <CardDescription>Monitoreo y gestión de amenazas de seguridad</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Actualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amenaza</TableHead>
                      <TableHead>Severidad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Origen</TableHead>
                      <TableHead>Sistemas Afectados</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockThreats.map((threat) => (
                      <TableRow key={threat.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(threat.severity)}
                            <div>
                              <div className="font-medium">{threat.type}</div>
                              <div className="text-sm text-muted-foreground">{threat.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            threat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            threat.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            threat.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {threat.severity === 'critical' ? 'Crítica' :
                             threat.severity === 'high' ? 'Alta' :
                             threat.severity === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(threat.status)}>
                            {threat.status === 'investigating' ? 'Investigando' :
                             threat.status === 'resolved' ? 'Resuelto' :
                             threat.status === 'monitoring' ? 'Monitoreando' : threat.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{threat.source}</code>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {threat.affectedSystems.join(', ')}
                          </div>
                        </TableCell>
                        <TableCell>{formatTimestamp(threat.timestamp)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Flag className="h-3 w-3" />
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

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Logs de Auditoría</CardTitle>
                  <CardDescription>Registro detallado de actividades del sistema</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Buscar en logs..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha/Hora</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Recurso</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Riesgo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAuditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.resource}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status === 'success' ? 'Éxito' : 
                             log.status === 'blocked' ? 'Bloqueado' : log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{log.ipAddress}</code>
                        </TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell>
                          <Badge className={
                            log.risk === 'high' ? 'bg-red-100 text-red-800' :
                            log.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {log.risk === 'high' ? 'Alto' : log.risk === 'medium' ? 'Medio' : 'Bajo'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cumplimiento Normativo</CardTitle>
                <CardDescription>Estado de cumplimiento de marcos regulatorios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockCompliance.map((comp) => (
                    <div key={comp.framework} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{comp.framework}</h3>
                          <p className="text-sm text-muted-foreground">
                            Última auditoría: {formatTimestamp(comp.lastAudit)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold" style={{ 
                            color: comp.score >= 90 ? '#16a34a' : comp.score >= 70 ? '#eab308' : '#dc2626' 
                          }}>
                            {comp.score}%
                          </div>
                          <Badge className={getStatusColor(comp.status)}>
                            {comp.status === 'compliant' ? 'Cumple' :
                             comp.status === 'in-progress' ? 'En Progreso' :
                             comp.status === 'needs-attention' ? 'Requiere Atención' : comp.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-3 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-xl font-bold">{comp.requirements}</div>
                          <div className="text-sm text-muted-foreground">Requisitos Totales</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-xl font-bold text-green-600">{comp.completed}</div>
                          <div className="text-sm text-muted-foreground">Completados</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <div className="text-xl font-bold text-yellow-600">{comp.pending}</div>
                          <div className="text-sm text-muted-foreground">Pendientes</div>
                        </div>
                      </div>
                      
                      <Progress value={(comp.completed / comp.requirements) * 100} className="mb-4" />
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Próxima auditoría: {formatTimestamp(comp.nextAudit)}
                        </span>
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backups" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sistema de Backups</CardTitle>
                  <CardDescription>Gestión y monitoreo de copias de seguridad</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Backup Manual
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recurso</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Último Backup</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Frecuencia</TableHead>
                      <TableHead>Retención</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBackups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {backup.type === 'Database' ? <Database className="h-4 w-4 text-blue-500" /> :
                             backup.type === 'Files' ? <HardDrive className="h-4 w-4 text-green-500" /> :
                             <Server className="h-4 w-4 text-purple-500" />}
                            <span className="font-medium">{backup.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{backup.type}</Badge>
                        </TableCell>
                        <TableCell>{formatTimestamp(backup.lastBackup)}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(backup.status)}>
                            {backup.status === 'success' ? 'Exitoso' : 
                             backup.status === 'warning' ? 'Advertencia' : backup.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{backup.frequency}</TableCell>
                        <TableCell>{backup.retention}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <RefreshCw className="h-3 w-3" />
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
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
