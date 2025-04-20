
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'warning' | 'critical' | 'info';
}

const alerts: Alert[] = [
  {
    id: 'alert-001',
    title: 'A/C System Maintenance',
    description: 'Scheduled maintenance in North Building',
    time: '10 min ago',
    type: 'info',
  },
  {
    id: 'alert-002',
    title: 'High Energy Consumption',
    description: 'West Wing exceeding normal usage',
    time: '45 min ago',
    type: 'warning',
  },
  {
    id: 'alert-003',
    title: 'Fire Alarm Test',
    description: 'Regular testing in Science Building',
    time: '1 hour ago',
    type: 'info',
  },
  {
    id: 'alert-004',
    title: 'Security Alert',
    description: 'Unauthorized access attempt at East Gate',
    time: '3 hours ago',
    type: 'critical',
  },
];

const getAlertStyles = (type: Alert['type']) => {
  switch (type) {
    case 'critical':
      return 'bg-red-50 border-l-4 border-red-500';
    case 'warning':
      return 'bg-yellow-50 border-l-4 border-yellow-500';
    case 'info':
      return 'bg-blue-50 border-l-4 border-blue-500';
    default:
      return 'bg-gray-50 border-l-4 border-gray-500';
  }
};

export function CampusAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Campus Alerts</CardTitle>
          <CardDescription>Recent notifications and alerts</CardDescription>
        </div>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-md ${getAlertStyles(alert.type)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {alert.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {alert.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
