
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'info';
  location: string;
  time: string;
  read: boolean;
}

const alerts: Alert[] = [
  {
    id: 'alert-001',
    title: 'High Energy Consumption',
    message: 'Science Building is showing 25% higher energy usage than normal for this time.',
    type: 'warning',
    location: 'Science Building',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 'alert-002',
    title: 'Fire Alarm Triggered',
    message: 'Fire alarm has been triggered in the Main Building, East Wing, Floor 2. Security team has been dispatched.',
    type: 'critical',
    location: 'Main Building, East Wing',
    time: '25 minutes ago',
    read: true,
  },
  {
    id: 'alert-003',
    title: 'Room Maintenance Scheduled',
    message: 'Scheduled maintenance for Lecture Hall 101 tomorrow from 8 AM to 12 PM. All bookings have been relocated.',
    type: 'info',
    location: 'Lecture Hall 101',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 'alert-004',
    title: 'Unauthorized Access Attempt',
    message: 'Multiple unauthorized access attempts detected at Server Room B. Security team notified.',
    type: 'critical',
    location: 'IT Building, Server Room B',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 'alert-005',
    title: 'HVAC System Malfunction',
    message: 'HVAC system in Library showing irregular behavior. Maintenance team has been notified.',
    type: 'warning',
    location: 'Library, Floor 3',
    time: '3 hours ago',
    read: true,
  },
];

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'critical':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'info':
      return <Info className="h-5 w-5 text-blue-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};

const getAlertClass = (type: Alert['type']) => {
  switch (type) {
    case 'critical':
      return 'border-l-4 border-red-500 bg-red-50';
    case 'warning':
      return 'border-l-4 border-yellow-500 bg-yellow-50';
    case 'info':
      return 'border-l-4 border-blue-500 bg-blue-50';
    default:
      return 'border-l-4 border-gray-500 bg-gray-50';
  }
};

export default function Alerts() {
  return (
    <PageLayout title="Alerts & Notifications">
      <Tabs defaultValue="active">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="active">Active Alerts</TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          </TabsList>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Test Alert System
          </Button>
        </div>

        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Alert Center</CardTitle>
                  <CardDescription>Manage and respond to campus alerts</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark All Read
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="mr-2 h-4 w-4" />
                    History
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-md ${getAlertClass(alert.type)} ${
                      alert.read ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getAlertIcon(alert.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-base">{alert.title}</h4>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm mt-1">{alert.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <span className="text-xs bg-background px-2 py-0.5 rounded-full">
                              {alert.location}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            {!alert.read && (
                              <Button variant="ghost" size="sm">
                                Mark as Read
                              </Button>
                            )}
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you want to receive alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Alert Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 'critical', label: 'Critical Alerts', desc: 'Security, safety, and emergency notifications' },
                          { id: 'system', label: 'System Warnings', desc: 'Maintenance issues and system malfunctions' },
                          { id: 'energy', label: 'Energy Alerts', desc: 'Consumption anomalies and efficiency concerns' },
                          { id: 'access', label: 'Access Notifications', desc: 'Unauthorized access attempts and door alarms' },
                          { id: 'info', label: 'Informational', desc: 'System updates and general information' },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between space-x-2">
                            <div>
                              <Label htmlFor={item.id} className="font-medium">
                                {item.label}
                              </Label>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch id={item.id} defaultChecked={item.id !== 'info'} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Notification Methods</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 'app', label: 'In-App Notifications', desc: 'Receive alerts in the dashboard' },
                          { id: 'email', label: 'Email Notifications', desc: 'Receive alerts via email' },
                          { id: 'sms', label: 'SMS Notifications', desc: 'Receive text alerts for critical issues' },
                          { id: 'push', label: 'Push Notifications', desc: 'Receive alerts on your mobile device' },
                          { id: 'reports', label: 'Weekly Report', desc: 'Receive a summary of all alerts' },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between space-x-2">
                            <div>
                              <Label htmlFor={item.id} className="font-medium">
                                {item.label}
                              </Label>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch id={item.id} defaultChecked={['app', 'email'].includes(item.id)} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Alert Scheduling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor="quiet-hours" className="font-medium">
                            Quiet Hours
                          </Label>
                          <p className="text-sm text-muted-foreground">Disable non-critical alerts during specified hours</p>
                        </div>
                        <Switch id="quiet-hours" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                        <div>
                          <Label htmlFor="start-time" className="text-sm">Start Time</Label>
                          <input 
                            type="time" 
                            id="start-time" 
                            defaultValue="22:00"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="end-time" className="text-sm">End Time</Label>
                          <input 
                            type="time" 
                            id="end-time" 
                            defaultValue="07:00"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
