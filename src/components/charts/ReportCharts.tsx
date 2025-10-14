/**
 * Componentes de gráficos para reportes y analytics
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Colores para los gráficos
const COLORS = {
  primary: '#3b82f6',
  secondary: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#06b6d4',
  purple: '#8b5cf6',
  pink: '#ec4899',
  orange: '#f97316'
};

const PIE_COLORS = [
  COLORS.primary,
  COLORS.success,
  COLORS.warning,
  COLORS.secondary,
  COLORS.info,
  COLORS.purple,
  COLORS.pink,
  COLORS.orange
];

interface ChartProps {
  title?: string;
  data: any[];
  className?: string;
}

/**
 * Gráfico de barras para asistencia
 */
export const AttendanceChart: React.FC<ChartProps> = ({ 
  title = "Estadísticas de Asistencia", 
  data, 
  className = "" 
}) => {
  const chartData = [
    { name: 'Presentes', value: data.find(d => d.status === 'present')?.count || 0, color: COLORS.success },
    { name: 'Ausentes', value: data.find(d => d.status === 'absent')?.count || 0, color: COLORS.secondary },
    { name: 'Tarde', value: data.find(d => d.status === 'late')?.count || 0, color: COLORS.warning },
    { name: 'Medio Día', value: data.find(d => d.status === 'half_day')?.count || 0, color: COLORS.info }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={COLORS.primary} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Gráfico circular para distribución de empleados
 */
export const EmployeeDistributionChart: React.FC<ChartProps & { 
  dataKey: string;
  labelKey: string;
}> = ({ 
  title = "Distribución de Empleados", 
  data, 
  dataKey,
  labelKey,
  className = "" 
}) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: value as number
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Gráfico de líneas para tendencias de nómina
 */
export const PayrollTrendChart: React.FC<ChartProps> = ({ 
  title = "Tendencia de Nóminas", 
  data, 
  className = "" 
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Monto']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="totalAmount" 
              stroke={COLORS.primary} 
              strokeWidth={2}
              name="Monto Total"
            />
            <Line 
              type="monotone" 
              dataKey="totalBonuses" 
              stroke={COLORS.success} 
              strokeWidth={2}
              name="Bonos"
            />
            <Line 
              type="monotone" 
              dataKey="totalDeductions" 
              stroke={COLORS.secondary} 
              strokeWidth={2}
              name="Deducciones"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Gráfico de área para horas trabajadas
 */
export const WorkHoursChart: React.FC<ChartProps> = ({ 
  title = "Horas Trabajadas por Día", 
  data, 
  className = "" 
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} horas`, 'Horas']} />
            <Area 
              type="monotone" 
              dataKey="totalHours" 
              stroke={COLORS.primary} 
              fill={COLORS.primary}
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Gráfico de barras comparativo para departamentos
 */
export const DepartmentComparisonChart: React.FC<ChartProps> = ({ 
  title = "Comparación por Departamentos", 
  data, 
  className = "" 
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="department" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="employees" fill={COLORS.primary} name="Empleados" />
            <Bar dataKey="attendance" fill={COLORS.success} name="Asistencia %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Métricas rápidas en cards
 */
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = COLORS.primary,
  className = ""
}) => {
  const changeColor = change && change > 0 ? COLORS.success : COLORS.secondary;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div style={{ color }}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" style={{ color }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground">
            <span style={{ color: changeColor }}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            {changeLabel && ` ${changeLabel}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Dashboard de métricas
 */
interface MetricsDashboardProps {
  attendanceStats: any;
  payrollStats: any;
  employeeStats: any;
  jobPositionStats: any;
  className?: string;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  attendanceStats,
  payrollStats,
  employeeStats,
  jobPositionStats,
  className = ""
}) => {
  const attendanceRate = attendanceStats.totalRecords > 0 
    ? (attendanceStats.present / attendanceStats.totalRecords * 100).toFixed(1)
    : '0';

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <MetricCard
        title="Total Empleados"
        value={employeeStats.total}
        icon={<span>👥</span>}
        color={COLORS.primary}
      />
      
      <MetricCard
        title="Tasa de Asistencia"
        value={`${attendanceRate}%`}
        icon={<span>✅</span>}
        color={COLORS.success}
      />
      
      <MetricCard
        title="Nómina Total"
        value={`$${payrollStats.totalAmount.toLocaleString()}`}
        icon={<span>💰</span>}
        color={COLORS.warning}
      />
      
      <MetricCard
        title="Posiciones Abiertas"
        value={jobPositionStats.open}
        icon={<span>🎯</span>}
        color={COLORS.info}
      />
      
      <MetricCard
        title="Horas Trabajadas"
        value={`${attendanceStats.totalHours.toFixed(0)}h`}
        icon={<span>⏰</span>}
        color={COLORS.purple}
      />
      
      <MetricCard
        title="Promedio Salario"
        value={`$${payrollStats.averageSalary.toLocaleString()}`}
        icon={<span>📊</span>}
        color={COLORS.pink}
      />
      
      <MetricCard
        title="Empleados Activos"
        value={employeeStats.active}
        icon={<span>🟢</span>}
        color={COLORS.success}
      />
      
      <MetricCard
        title="Tardanzas"
        value={attendanceStats.late}
        icon={<span>⚠️</span>}
        color={COLORS.secondary}
      />
    </div>
  );
};