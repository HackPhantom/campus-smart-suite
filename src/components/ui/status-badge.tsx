
import { cn } from '@/lib/utils';

type StatusType = 'online' | 'offline' | 'warning' | 'maintenance';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusStyles = {
  online: "bg-green-100 text-green-800 border-green-200",
  offline: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  maintenance: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusDotStyles = {
  online: "bg-green-500",
  offline: "bg-red-500",
  warning: "bg-yellow-500",
  maintenance: "bg-blue-500",
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", statusDotStyles[status])}></span>
      {label || status}
    </span>
  );
}
