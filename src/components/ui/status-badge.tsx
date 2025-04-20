
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock,
  Wrench 
} from 'lucide-react';

type Status = 'online' | 'offline' | 'warning' | 'maintenance' | 'upcoming' | 'completed';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          label: 'Online',
          icon: CheckCircle2,
          className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
        };
      case 'offline':
        return {
          label: 'Offline',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
        };
      case 'warning':
        return {
          label: 'Warning',
          icon: AlertTriangle,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200'
        };
      case 'maintenance':
        return {
          label: 'Maintenance',
          icon: Wrench,
          className: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
        };
      case 'upcoming':
        return {
          label: 'Upcoming',
          icon: Clock,
          className: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200'
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
        };
      default:
        return {
          label: 'Unknown',
          icon: AlertTriangle,
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={cn(
      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
      'transition-all duration-200 hover:scale-105',
      'animate-slide-in',
      config.className,
      className
    )}>
      <IconComponent className="h-3 w-3 mr-1" />
      {config.label}
    </div>
  );
};
