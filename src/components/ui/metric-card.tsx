
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-lg transition-all duration-200 animate-scale", 
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-5 w-5 text-muted-foreground transition-transform duration-200 hover:scale-110">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold transition-colors hover:text-primary">
          {value}
        </div>
        {(description || trend) && (
          <div className="mt-2 flex items-center text-xs">
            {trend && (
              <span
                className={cn(
                  "mr-1 rounded-sm px-1 py-0.5 font-medium transition-colors",
                  trend.isPositive
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
            )}
            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
