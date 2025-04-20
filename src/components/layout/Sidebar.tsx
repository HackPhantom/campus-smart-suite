
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CalendarClock, Home, FileCheck, Gauge, Map, Bell, Building2, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
};

const items: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/',
  },
  {
    title: 'Room Booking',
    icon: Building2,
    path: '/room-booking',
  },
  {
    title: 'Attendance',
    icon: FileCheck,
    path: '/attendance',
    badge: 3,
  },
  {
    title: 'Energy Monitor',
    icon: Gauge,
    path: '/energy',
  },
  {
    title: 'Campus Map',
    icon: Map,
    path: '/map',
  },
  {
    title: 'Alerts',
    icon: Bell,
    path: '/alerts',
    badge: 2,
  },
  {
    title: 'Users',
    icon: Users,
    path: '/users',
  },
  {
    title: 'Security',
    icon: ShieldCheck,
    path: '/security',
  },
];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'bg-background border-r border-border transition-all duration-300 ease-in-out flex flex-col',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4">
        <div className={cn('flex items-center', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl">CampusSmart</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className={collapsed ? 'mx-auto' : ''}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
              'hover:bg-muted hover:text-primary',
              window.location.pathname === item.path
                ? 'bg-primary/10 text-primary'
                : 'text-foreground'
            )}
          >
            <item.icon className={cn('h-5 w-5', collapsed ? 'mx-auto' : 'mr-3')} />
            {!collapsed && (
              <span className="flex-1">{item.title}</span>
            )}
            {!collapsed && item.badge && (
              <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-foreground">JS</span>
            </div>
            <div>
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-foreground">JS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// These components are used only in the Sidebar
function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
