
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings, 
  CreditCard, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  FileText,
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Send,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Star,
  Crown,
  Building,
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Wallet,
  Receipt,
  Bell,
  RefreshCw,
  Package,
  Shield
} from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const mockPlans = [
  {
    id: 'basic',
    name: 'Plan Básico',
    description: 'Ideal para pequeñas empresas',
    price: 29,
    currency: 'EUR',
    billing: 'monthly',
    features: ['Hasta 10 empleados', 'Gestión básica de RRHH', 'Soporte por email', '5GB almacenamiento'],
    active: true,
    popular: false,
    subscribers: 145
  },
  {
    id: 'professional',
    name: 'Plan Profesional',
    description: 'Perfecto para empresas en crecimiento',
    price: 79,
    currency: 'EUR',
    billing: 'monthly',
    features: ['Hasta 100 empleados', 'Módulos completos', 'Soporte prioritario', '50GB almacenamiento', 'Integraciones API'],
    active: true,
    popular: true,
    subscribers: 89
  },
  {
    id: 'enterprise',
    name: 'Plan Enterprise',
    description: 'Solución completa para grandes organizaciones',
    price: 199,
    currency: 'EUR',
    billing: 'monthly',
    features: ['Empleados ilimitados', 'Todos los módulos', 'Soporte 24/7', 'Almacenamiento ilimitado', 'Personalización completa', 'Consultor dedicado'],
    active: true,
    popular: false,
    subscribers: 34
  }
];

const mockSubscriptions = [
  {
    id: '1',
    company: 'Innovate Corp',
    plan: 'professional',
    status: 'active',
    startDate: '2024-01-15',
    nextBilling: '2024-11-15',
    amount: 79,
    employees: 45,
    contact: 'ana.garcia@innovate.com',
    paymentMethod: 'card',
    autoRenew: true
  },
  {
    id: '2',
    company: 'TechStart Solutions',
    plan: 'basic',
    status: 'active',
    startDate: '2024-03-01',
    nextBilling: '2024-11-01',
    amount: 29,
    employees: 8,
    contact: 'carlos@techstart.com',
    paymentMethod: 'transfer',
    autoRenew: true
  },
  {
    id: '3',
    company: 'Global Enterprises',
    plan: 'enterprise',
    status: 'active',
    startDate: '2023-12-01',
    nextBilling: '2024-12-01',
    amount: 199,
    employees: 250,
    contact: 'sofia@global-ent.com',
    paymentMethod: 'card',
    autoRenew: true
  },
  {
    id: '4',
    company: 'StartupX',
    plan: 'basic',
    status: 'cancelled',
    startDate: '2024-02-01',
    nextBilling: null,
    amount: 29,
    employees: 6,
    contact: 'info@startupx.com',
    paymentMethod: 'card',
    autoRenew: false
  }
];

const mockInvoices = [
  {
    id: 'INV-2024-001',
    company: 'Innovate Corp',
    amount: 79,
    issueDate: '2024-10-15',
    dueDate: '2024-11-15',
    status: 'paid',
    paymentDate: '2024-10-16',
    plan: 'professional'
  },
  {
    id: 'INV-2024-002',
    company: 'Global Enterprises',
    amount: 199,
    issueDate: '2024-10-01',
    dueDate: '2024-11-01',
    status: 'pending',
    paymentDate: null,
    plan: 'enterprise'
  },
  {
    id: 'INV-2024-003',
    company: 'TechStart Solutions',
    amount: 29,
    issueDate: '2024-10-01',
    dueDate: '2024-11-01',
    status: 'overdue',
    paymentDate: null,
    plan: 'basic'
  }
];

const mockMetrics = {
  totalRevenue: 24580,
  monthlyRecurring: 8940,
  totalSubscriptions: 268,
  churnRate: 3.2,
  averageRevenue: 67.50,
  conversionRate: 15.8,
  lifetimeValue: 1240
};

export default function PlanManagementPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'trial': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic': return <Package className="h-4 w-4 text-blue-500" />;
      case 'professional': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'enterprise': return <Crown className="h-4 w-4 text-purple-500" />;
      default: return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const calculateDaysUntilBilling = (nextBilling: string | null) => {
    if (!nextBilling) return null;
    const today = new Date();
    const billing = new Date(nextBilling);
    const diffTime = billing.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              Gestión de Planes y Facturación
            </h1>
            <p className="text-muted-foreground mt-2">
              Administración completa de suscripciones, facturación y métricas comerciales
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Suscripción
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Datos
            </Button>
          </div>
        </header>

        {/* Métricas Comerciales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockMetrics.totalRevenue)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +18% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MRR</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockMetrics.monthlyRecurring)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% crecimiento mensual
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suscripciones Activas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.totalSubscriptions}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +24 nuevas este mes
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Churn</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.churnRate}%</div>
              <div className="flex items-center text-xs text-red-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -0.8% mejora vs anterior
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Contenido */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="plans">Planes</TabsTrigger>
            <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
            <TabsTrigger value="invoices">Facturación</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Distribución de Planes */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Planes</CardTitle>
                  <CardDescription>Suscriptores activos por tipo de plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPlans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getPlanIcon(plan.id)}
                        <div>
                          <h4 className="font-medium">{plan.name}</h4>
                          <p className="text-sm text-muted-foreground">{formatCurrency(plan.price)}/mes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{plan.subscribers}</div>
                        <div className="text-sm text-muted-foreground">suscriptores</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Facturas Pendientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Facturas Pendientes</CardTitle>
                  <CardDescription>Pagos por cobrar y vencimientos próximos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockInvoices.filter(inv => inv.status !== 'paid').map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{invoice.company}</h4>
                        <p className="text-sm text-muted-foreground">
                          {invoice.id} • Vence: {formatDate(invoice.dueDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(invoice.amount)}</div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status === 'pending' ? 'Pendiente' : 
                           invoice.status === 'overdue' ? 'Vencida' : invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Métricas Clave */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas Clave de Negocio</CardTitle>
                <CardDescription>Indicadores principales de rendimiento comercial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(mockMetrics.averageRevenue)}</div>
                    <div className="text-sm text-muted-foreground">ARPU (Revenue per User)</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockMetrics.conversionRate}%</div>
                    <div className="text-sm text-muted-foreground">Tasa de Conversión</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(mockMetrics.lifetimeValue)}</div>
                    <div className="text-sm text-muted-foreground">LTV (Lifetime Value)</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">18.5</div>
                    <div className="text-sm text-muted-foreground">Meses Promedio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestión de Planes</CardTitle>
                  <CardDescription>Administra los planes de suscripción disponibles</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Plan
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {mockPlans.map((plan) => (
                    <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary">Más Popular</Badge>
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                          {getPlanIcon(plan.id)}
                        </div>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="text-3xl font-bold">
                          {formatCurrency(plan.price)}
                          <span className="text-base font-normal text-muted-foreground">/mes</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="space-y-2">
                          <div className="text-center text-sm text-muted-foreground">
                            {plan.subscribers} suscriptores activos
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-3 w-3 mr-1" />
                              Ver
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Suscripciones Activas</CardTitle>
                  <CardDescription>Gestión de todas las suscripciones de clientes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Buscar empresa..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Empleados</TableHead>
                      <TableHead>Facturación</TableHead>
                      <TableHead>Próximo Pago</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSubscriptions.map((subscription) => {
                      const daysUntilBilling = calculateDaysUntilBilling(subscription.nextBilling);
                      const plan = mockPlans.find(p => p.id === subscription.plan);
                      
                      return (
                        <TableRow key={subscription.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{subscription.company}</div>
                              <div className="text-sm text-muted-foreground">{subscription.contact}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getPlanIcon(subscription.plan)}
                              <span>{plan?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(subscription.status)}>
                              {subscription.status === 'active' ? 'Activa' : 
                               subscription.status === 'cancelled' ? 'Cancelada' : subscription.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{subscription.employees}</TableCell>
                          <TableCell>{formatCurrency(subscription.amount)}/mes</TableCell>
                          <TableCell>
                            {subscription.nextBilling ? (
                              <div>
                                <div>{formatDate(subscription.nextBilling)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {daysUntilBilling !== null && daysUntilBilling >= 0 ? 
                                    `en ${daysUntilBilling} días` : 'Vencido'}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
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
                                <Receipt className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Centro de Facturación</CardTitle>
                  <CardDescription>Gestión de facturas, pagos y cobranza</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Generar Factura
                  </Button>
                  <Button variant="outline">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Recordatorios
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factura</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Importe</TableHead>
                      <TableHead>Fecha Emisión</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvoices.map((invoice) => {
                      const plan = mockPlans.find(p => p.id === invoice.plan);
                      
                      return (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{invoice.id}</code>
                          </TableCell>
                          <TableCell>{invoice.company}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getPlanIcon(invoice.plan)}
                              <span>{plan?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(invoice.amount)}</TableCell>
                          <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status === 'paid' ? 'Pagada' : 
                               invoice.status === 'pending' ? 'Pendiente' :
                               invoice.status === 'overdue' ? 'Vencida' : invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Send className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Crecimiento de Ingresos</CardTitle>
                  <CardDescription>Evolución mensual de MRR</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-12 border-2 border-dashed rounded-lg">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Gráfico de Crecimiento</h3>
                    <p className="text-muted-foreground">
                      Visualización del MRR y crecimiento mensual
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Ingresos</CardTitle>
                  <CardDescription>Ingresos por tipo de plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPlans.map((plan) => {
                      const revenue = plan.price * plan.subscribers;
                      const percentage = ((revenue / mockMetrics.monthlyRecurring) * 100).toFixed(1);
                      
                      return (
                        <div key={plan.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getPlanIcon(plan.id)}
                            <span>{plan.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(revenue)}</div>
                            <div className="text-sm text-muted-foreground">{percentage}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Métricas Avanzadas */}
            <Card>
              <CardHeader>
                <CardTitle>Analytics Avanzados</CardTitle>
                <CardDescription>Métricas detalladas del negocio SaaS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-6 border rounded-lg">
                    <Target className="mx-auto h-8 w-8 text-blue-500 mb-3" />
                    <div className="text-2xl font-bold">84.2%</div>
                    <div className="text-sm text-muted-foreground">Tasa de Retención</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <TrendingUp className="mx-auto h-8 w-8 text-green-500 mb-3" />
                    <div className="text-2xl font-bold">23.1%</div>
                    <div className="text-sm text-muted-foreground">Crecimiento MRR</div>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Wallet className="mx-auto h-8 w-8 text-purple-500 mb-3" />
                    <div className="text-2xl font-bold">12.8</div>
                    <div className="text-sm text-muted-foreground">Payback Period (meses)</div>
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
