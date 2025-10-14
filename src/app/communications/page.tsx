
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Megaphone, 
  MessageSquare, 
  Bell, 
  Send, 
  Users, 
  Search, 
  Filter,
  PlusCircle, 
  Edit,
  Trash2,
  Eye,
  Pin,
  Star,
  Calendar,
  Clock,
  Mail,
  MessageCircle,
  Paperclip,
  Phone,
  Video,
  MoreHorizontal,
  Check,
  CheckCheck,
  Volume2,
  BellRing,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Archive,
  Forward,
  Reply,
  Settings,
  Download,
  Share2
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const mockMessages = [
  {
    id: '1',
    type: 'chat',
    sender: 'Ana García',
    senderRole: 'Gerente de RRHH',
    senderAvatar: '/avatars/ana.jpg',
    content: '¿Podríamos revisar los nuevos contratos esta tarde?',
    timestamp: '2024-10-13T10:30:00',
    status: 'read',
    channel: 'rrhh-general',
    attachments: []
  },
  {
    id: '2',
    type: 'announcement',
    sender: 'Dirección General',
    senderRole: 'Administración',
    senderAvatar: '/avatars/admin.jpg',
    content: 'Recordatorio: Reunión de equipo mañana a las 9:00 AM en la sala de conferencias.',
    timestamp: '2024-10-13T09:15:00',
    status: 'unread',
    priority: 'high',
    channel: 'anuncios',
    attachments: [],
    expiresAt: '2024-10-14T09:00:00'
  },
  {
    id: '3',
    type: 'notification',
    sender: 'Sistema',
    senderRole: 'Automatizado',
    senderAvatar: null,
    content: 'Tu solicitud de vacaciones ha sido aprobada para el período del 20-25 de octubre.',
    timestamp: '2024-10-12T16:45:00',
    status: 'read',
    channel: 'notificaciones',
    attachments: []
  },
  {
    id: '4',
    type: 'chat',
    sender: 'Carlos López',
    senderRole: 'Desarrollador',
    senderAvatar: '/avatars/carlos.jpg',
    content: 'He completado la implementación del nuevo módulo. ¿Puedes revisarlo?',
    timestamp: '2024-10-12T14:20:00',
    status: 'delivered',
    channel: 'desarrollo',
    attachments: [{ name: 'modulo-nuevo.zip', size: '2.4 MB' }]
  }
];

const mockChannels = [
  { id: 'general', name: 'General', type: 'public', members: 24, unread: 3 },
  { id: 'rrhh-general', name: 'RRHH General', type: 'private', members: 8, unread: 1 },
  { id: 'desarrollo', name: 'Desarrollo', type: 'private', members: 12, unread: 2 },
  { id: 'marketing', name: 'Marketing', type: 'public', members: 15, unread: 0 },
  { id: 'anuncios', name: 'Anuncios', type: 'announcement', members: 45, unread: 1 }
];

const mockNotifications = [
  {
    id: '1',
    type: 'info',
    title: 'Actualización del Sistema',
    message: 'El sistema se actualizará esta noche entre las 2:00 y 4:00 AM',
    timestamp: '2024-10-13T08:00:00',
    read: false,
    action: 'Más información'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Recordatorio de Evaluación',
    message: 'Tu evaluación de desempeño vence en 3 días',
    timestamp: '2024-10-12T15:30:00',
    read: true,
    action: 'Completar evaluación'
  },
  {
    id: '3',
    type: 'success',
    title: 'Nómina Procesada',
    message: 'La nómina de octubre ha sido procesada exitosamente',
    timestamp: '2024-10-12T12:00:00',
    read: true,
    action: 'Ver detalles'
  }
];

const mockAnnouncements = [
  {
    id: '1',
    title: 'Nueva Política de Trabajo Remoto',
    content: 'A partir del 1 de noviembre, se implementará la nueva política de trabajo híbrido que permitirá hasta 3 días de trabajo remoto por semana.',
    author: 'Dirección General',
    timestamp: '2024-10-10T10:00:00',
    priority: 'high',
    pinned: true,
    category: 'Política',
    views: 142,
    likes: 28
  },
  {
    id: '2',
    title: 'Actualización del Sistema de Nóminas',
    content: 'El sistema de nóminas será actualizado el próximo fin de semana. No habrá interrupciones en el servicio.',
    author: 'IT Department',
    timestamp: '2024-10-09T14:30:00',
    priority: 'medium',
    pinned: false,
    category: 'Tecnología',
    views: 89,
    likes: 12
  },
  {
    id: '3',
    title: 'Celebración Fin de Año',
    content: 'Save the date: Celebración de fin de año el 15 de diciembre en el salón principal. Más detalles próximamente.',
    author: 'Recursos Humanos',
    timestamp: '2024-10-08T11:15:00',
    priority: 'low',
    pinned: false,
    category: 'Eventos',
    views: 156,
    likes: 45
  }
];

export default function CommunicationsPage() {
  const [selectedTab, setSelectedTab] = useState("messages");
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="h-4 w-4 text-gray-500" />;
      case 'delivered': return <CheckCheck className="h-4 w-4 text-gray-500" />;
      case 'read': return <CheckCheck className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <X className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `hace ${diffMins}m`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    if (diffDays < 7) return `hace ${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Megaphone className="h-8 w-8 text-primary" />
              Centro de Comunicaciones
            </h1>
            <p className="text-muted-foreground mt-2">
              Mensajería interna, notificaciones y anuncios corporativos
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Anuncio
            </Button>
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Nuevo Chat
            </Button>
          </div>
        </header>

        {/* Métricas de Comunicaciones */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensajes Activos</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12% vs semana anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canales Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockChannels.length}</div>
              <p className="text-xs text-muted-foreground">canales de comunicación</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notificaciones</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockNotifications.filter(n => !n.read).length}</div>
              <p className="text-xs text-muted-foreground">sin leer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anuncios</CardTitle>
              <Megaphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnnouncements.length}</div>
              <p className="text-xs text-muted-foreground">publicados este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Contenido */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="announcements">Anuncios</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Lista de Canales */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Canales
                  </CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Buscar canales..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {mockChannels.map((channel) => (
                        <div
                          key={channel.id}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedChannel === channel.id ? 'bg-primary/10' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedChannel(channel.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {channel.type === 'private' ? (
                                <MessageSquare className="h-4 w-4 text-gray-500" />
                              ) : channel.type === 'announcement' ? (
                                <Megaphone className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Users className="h-4 w-4 text-green-500" />
                              )}
                              <span className="font-medium">{channel.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{channel.members}</span>
                            {channel.unread > 0 && (
                              <Badge variant="default" className="text-xs">
                                {channel.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Chat Principal */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      #{selectedChannel}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80 mb-4">
                    <div className="space-y-4">
                      {mockMessages
                        .filter(msg => msg.channel === selectedChannel)
                        .map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.senderAvatar || undefined} />
                            <AvatarFallback>
                              {message.sender.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.sender}</span>
                              <span className="text-xs text-muted-foreground">{message.senderRole}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(message.timestamp)}
                              </span>
                              {getMessageStatusIcon(message.status)}
                            </div>
                            <p className="text-sm">{message.content}</p>
                            {message.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((attachment, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                                    <Paperclip className="h-3 w-3" />
                                    <span>{attachment.name}</span>
                                    <span className="text-muted-foreground">({attachment.size})</span>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Input de Mensaje */}
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Mensaje para #${selectedChannel}...`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Centro de Notificaciones</CardTitle>
                  <CardDescription>Gestiona todas tus notificaciones y alertas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Marcar Todo Leído
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-4 border rounded-lg ${
                        !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            {notification.action}
                          </Button>
                          {!notification.read && (
                            <Button size="sm" variant="ghost">
                              <Check className="h-3 w-3 mr-1" />
                              Marcar Leído
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tablón de Anuncios</CardTitle>
                  <CardDescription>Comunicaciones oficiales y anuncios importantes</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Crear Anuncio
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {announcement.pinned && <Pin className="h-4 w-4 text-blue-500" />}
                          <h3 className="text-lg font-semibold">{announcement.title}</h3>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority === 'high' ? 'Alta' : 
                             announcement.priority === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{announcement.content}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">
                            Por {announcement.author} • {formatTimestamp(announcement.timestamp)}
                          </span>
                          <Badge variant="outline">{announcement.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{announcement.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{announcement.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Comunicaciones</CardTitle>
                <CardDescription>Personaliza tus preferencias de notificaciones y mensajería</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones Push</h4>
                      <p className="text-sm text-muted-foreground">Recibir notificaciones en tiempo real</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email de Resumen</h4>
                      <p className="text-sm text-muted-foreground">Resumen diario de actividad por email</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Horarios de No Molestar</h4>
                      <p className="text-sm text-muted-foreground">Establecer horarios sin notificaciones</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Canales Suscritos</h4>
                      <p className="text-sm text-muted-foreground">Gestionar suscripciones a canales</p>
                    </div>
                    <Button variant="outline" size="sm">Gestionar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
