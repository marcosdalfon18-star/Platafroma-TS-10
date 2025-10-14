
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  PlusCircle, 
  Eye, 
  Edit,
  Play,
  Pause,
  BarChart3,
  Mail,
  Globe,
  MessageSquare,
  Search,
  Calendar,
  FileText,
  Megaphone,
  MousePointer,
  Share2,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const mockCampaigns = [
  {
    id: '1',
    name: 'Campaña de Lanzamiento Q4',
    type: 'Digital',
    status: 'active',
    budget: 15000,
    spent: 8500,
    impressions: 125000,
    clicks: 3200,
    conversions: 85,
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    roi: 240
  },
  {
    id: '2',
    name: 'Email Marketing Navideño',
    type: 'Email',
    status: 'scheduled',
    budget: 5000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    startDate: '2024-11-15',
    endDate: '2024-12-25',
    roi: 0
  },
  {
    id: '3',
    name: 'SEO Content Strategy',
    type: 'Content',
    status: 'active',
    budget: 8000,
    spent: 4200,
    impressions: 89000,
    clicks: 2100,
    conversions: 45,
    startDate: '2024-09-01',
    endDate: '2024-11-30',
    roi: 180
  }
];

const mockLeads = [
  { id: '1', name: 'Ana García', email: 'ana@empresa.com', source: 'Google Ads', score: 85, status: 'hot' },
  { id: '2', name: 'Carlos López', email: 'carlos@startup.com', source: 'Facebook', score: 72, status: 'warm' },
  { id: '3', name: 'Sofia Martín', email: 'sofia@corp.com', source: 'LinkedIn', score: 91, status: 'hot' },
  { id: '4', name: 'Miguel Torres', email: 'miguel@pyme.com', source: 'Email', score: 45, status: 'cold' }
];

const mockMetrics = {
  totalImpressions: 214000,
  totalClicks: 5300,
  totalConversions: 130,
  totalROI: 210,
  ctr: 2.48,
  conversionRate: 2.45,
  costPerClick: 4.25,
  costPerConversion: 173.50
};

export default function MarketingPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'warm': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              Marketing Estratégico
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestión integral de campañas, leads y estrategias de marketing
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Campaña
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Crear Contenido
            </Button>
          </div>
        </header>

        {/* Métricas Generales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impresiones Totales</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mockMetrics.totalImpressions)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks Totales</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mockMetrics.totalClicks)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.totalConversions}</div>
              <div className="flex items-center text-xs text-red-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -3% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI Promedio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.totalROI}%</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +15% vs mes anterior
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Contenido */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="campaigns">Campañas</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Campañas Activas */}
              <Card>
                <CardHeader>
                  <CardTitle>Campañas Activas</CardTitle>
                  <CardDescription>Estado actual de tus campañas en ejecución</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockCampaigns.filter(c => c.status === 'active').map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status === 'active' ? 'Activa' : campaign.status}
                          </Badge>
                          <span>•</span>
                          <span>{campaign.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{campaign.roi}% ROI</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                        </div>
                        <Progress value={(campaign.spent / campaign.budget) * 100} className="w-20 mt-1" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Leads Recientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Leads Calientes</CardTitle>
                  <CardDescription>Prospects con mayor puntuación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockLeads.filter(l => l.status === 'hot').map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{lead.name}</h4>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                        <Badge className={getLeadStatusColor(lead.status)}>
                          Score: {lead.score}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{lead.source}</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          <Mail className="h-3 w-3 mr-1" />
                          Contactar
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Métricas Detalladas */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Rendimiento</CardTitle>
                <CardDescription>Análisis detallado del desempeño de marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockMetrics.ctr}%</div>
                    <div className="text-sm text-muted-foreground">Click-Through Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockMetrics.conversionRate}%</div>
                    <div className="text-sm text-muted-foreground">Tasa de Conversión</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(mockMetrics.costPerClick)}</div>
                    <div className="text-sm text-muted-foreground">Costo por Click</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(mockMetrics.costPerConversion)}</div>
                    <div className="text-sm text-muted-foreground">Costo por Conversión</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Campañas</CardTitle>
                  <CardDescription>Administra todas tus campañas de marketing</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nueva Campaña
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaña</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Presupuesto</TableHead>
                      <TableHead>Gastado</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {campaign.startDate} - {campaign.endDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status === 'active' ? 'Activa' : 
                             campaign.status === 'scheduled' ? 'Programada' : campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                        <TableCell>{formatCurrency(campaign.spent)}</TableCell>
                        <TableCell>
                          <span className={campaign.roi > 200 ? 'text-green-600 font-medium' : 
                                        campaign.roi > 100 ? 'text-blue-600' : 'text-red-600'}>
                            {campaign.roi}%
                          </span>
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
                              {campaign.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
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

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Leads</CardTitle>
                  <CardDescription>Administra y cualifica tus prospects</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Importar Leads
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Fuente</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-muted-foreground">{lead.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{lead.source}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={lead.score} className="w-16" />
                            <span className="text-sm font-medium">{lead.score}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getLeadStatusColor(lead.status)}>
                            {lead.status === 'hot' ? 'Caliente' : 
                             lead.status === 'warm' ? 'Tibio' : 'Frío'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Star className="h-3 w-3" />
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
                  <CardTitle>Canales de Marketing</CardTitle>
                  <CardDescription>Rendimiento por canal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-blue-500" />
                        <span>Google Ads</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">45%</div>
                        <div className="text-sm text-muted-foreground">del tráfico</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-blue-700" />
                        <span>Facebook Ads</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">28%</div>
                        <div className="text-sm text-muted-foreground">del tráfico</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-500" />
                        <span>Email Marketing</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">18%</div>
                        <div className="text-sm text-muted-foreground">del tráfico</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-purple-500" />
                        <span>Orgánico</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">9%</div>
                        <div className="text-sm text-muted-foreground">del tráfico</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tendencias de Conversión</CardTitle>
                  <CardDescription>Evolución mensual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-8 border-2 border-dashed rounded-lg">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Gráfico de Conversiones</h3>
                      <p className="text-muted-foreground">
                        Visualización de tendencias de conversión por mes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
