/**
 * Componente reutilizable para mostrar métricas con iconos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "text-muted-foreground",
  trend,
  className
}) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", iconClassName)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className={cn(
            "flex items-center text-xs mt-1",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            <span>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="ml-1">vs mes anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;