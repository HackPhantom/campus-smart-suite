
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Lock, Key, AlertTriangle, Shield, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const securityEvents = [
  {
    id: 'evt-001',
    type: 'Access Denied',
    user: 'john.smith@example.edu',
    location: 'Server Room',
    time: '10:25 AM',
    date: 'Today',
    severity: 'high',
  },
  {
    id: 'evt-002',
    type: 'Login Attempt Failed',
    user: 'unknown',
    location: 'Admin Portal',
    time: '09:45 AM',
    date: 'Today',
    severity: 'medium',
  },
  {
    id: 'evt-003',
    type: 'Door Forced Open',
    user: 'N/A',
    location: 'East Wing Storage',
    time: '02:30 AM',
    date: 'Today',
    severity: 'high',
  },
  {
    id: 'evt-004',
    type: 'Login Success',
    user: 'admin@example.edu',
    location: 'Security Console',
    time: '08:00 AM',
    date: 'Today',
    severity: 'low',
  },
  {
    id: 'evt-005',
    type: 'Permission Changed',
    user: 'sysadmin@example.edu',
    location: 'User Management System',
    time: '4:45 PM',
    date: 'Yesterday',
    severity: 'medium',
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'text-red-500 bg-red-50 border-red-100';
    case 'medium':
      return 'text-yellow-500 bg-yellow-50 border-yellow-100';
    case 'low':
      return 'text-green-500 bg-green-50 border-green-100';
    default:
      return 'text-blue-500 bg-blue-50 border-blue-100';
  }
};

export default function Security() {
  return (
    <PageLayout title="Security Management">
      <Tabs defaultValue="dashboard">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[600px] grid-cols-3">
            <TabsTrigger value="dashboard">Security Dashboard</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShieldCheck className="h-8 w-8 text-green-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold">Secure</div>
                    <div className="text-xs text-muted-foreground">All systems operational</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-muted-foreground">2 medium, 1 high severity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Access Events (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Key className="h-8 w-8 text-blue-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="text-xs text-muted-foreground">42 denied, 1,206 granted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Security Events</CardTitle>
                    <CardDescription>Latest security alerts and events</CardDescription>
                  </div>
                  <Shield className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.slice(0, 4).map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-md border ${getSeverityColor(event.severity)}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{event.type}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            User: {event.user}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Location: {event.location}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {event.date}, {event.time}
                        </span>
                      </div>
                    </div>
                  ))}

                  <Button variant="ghost" className="w-full">
                    View All Events
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Security systems status</CardDescription>
                  </div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Access Control System', status: 100, statusText: 'Operational' },
                    { name: 'Video Surveillance', status: 100, statusText: 'Operational' },
                    { name: 'Alarm System', status: 92, statusText: 'Minor Issue' },
                    { name: 'ID Verification', status: 100, statusText: 'Operational' },
                    { name: 'Emergency Response', status: 100, statusText: 'Operational' },
                  ].map((system, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{system.name}</span>
                        <span 
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            system.status === 100 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {system.statusText}
                        </span>
                      </div>
                      <Progress value={system.status} className="h-2" />
                    </div>
                  ))}

                  <div className="flex justify-between pt-2">
                    <span className="text-sm text-muted-foreground">Last checked: 5 minutes ago</span>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Refresh</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Security Overview</CardTitle>
                  <CardDescription>Campus-wide security status</CardDescription>
                </div>
                <Button>
                  <Lock className="mr-2 h-4 w-4" />
                  Security Actions
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'Main Building',
                    status: 'Secure',
                    metrics: [
                      { label: 'Doors Secured', value: '42/42' },
                      { label: 'Cameras Active', value: '24/24' },
                      { label: 'Personnel Present', value: '18' },
                    ],
                    icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
                  },
                  {
                    title: 'Science Wing',
                    status: 'Alert',
                    metrics: [
                      { label: 'Doors Secured', value: '28/32' },
                      { label: 'Cameras Active', value: '16/18' },
                      { label: 'Personnel Present', value: '5' },
                    ],
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                  },
                  {
                    title: 'Library',
                    status: 'Secure',
                    metrics: [
                      { label: 'Doors Secured', value: '14/14' },
                      { label: 'Cameras Active', value: '12/12' },
                      { label: 'Personnel Present', value: '6' },
                    ],
                    icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
                  },
                  {
                    title: 'Admin Building',
                    status: 'Secure',
                    metrics: [
                      { label: 'Doors Secured', value: '16/16' },
                      { label: 'Cameras Active', value: '8/8' },
                      { label: 'Personnel Present', value: '12' },
                    ],
                    icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
                  },
                ].map((building, index) => (
                  <Card key={index} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{building.title}</CardTitle>
                        {building.icon}
                      </div>
                      <CardDescription>{building.status}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {building.metrics.map((metric, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{metric.label}</span>
                            <span className="font-medium">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-3">
                        Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Access Control</CardTitle>
                  <CardDescription>Manage building and room access permissions</CardDescription>
                </div>
                <Button>
                  <Key className="mr-2 h-4 w-4" />
                  Add Access Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Building/Area</th>
                      <th className="py-3 px-4 text-left font-medium">Access Level</th>
                      <th className="py-3 px-4 text-left font-medium">Authorized Groups</th>
                      <th className="py-3 px-4 text-left font-medium">Time Restrictions</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        area: 'Main Building - All Areas',
                        level: 'Standard',
                        groups: 'All Staff, All Faculty, All Students',
                        time: 'Weekdays 7AM-9PM',
                        status: 'Active',
                      },
                      {
                        area: 'Science Wing - Laboratories',
                        level: 'Restricted',
                        groups: 'Science Faculty, Lab Staff, Science Students',
                        time: 'Weekdays 8AM-6PM',
                        status: 'Active',
                      },
                      {
                        area: 'Admin Building - Offices',
                        level: 'Restricted',
                        groups: 'Administrative Staff',
                        time: 'Weekdays 8AM-5PM',
                        status: 'Active',
                      },
                      {
                        area: 'Server Room',
                        level: 'High Security',
                        groups: 'IT Administrators',
                        time: '24/7 Access',
                        status: 'Active',
                      },
                      {
                        area: 'Library - Study Rooms',
                        level: 'Standard',
                        groups: 'All Faculty, All Students',
                        time: 'Daily 7AM-11PM',
                        status: 'Active',
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-4">{item.area}</td>
                        <td className="py-3 px-4">{item.level}</td>
                        <td className="py-3 px-4">{item.groups}</td>
                        <td className="py-3 px-4">{item.time}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Security Logs</CardTitle>
                  <CardDescription>View detailed security event logs</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Last 24 Hours
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Time</th>
                      <th className="py-3 px-4 text-left font-medium">Event Type</th>
                      <th className="py-3 px-4 text-left font-medium">User</th>
                      <th className="py-3 px-4 text-left font-medium">Location</th>
                      <th className="py-3 px-4 text-left font-medium">Details</th>
                      <th className="py-3 px-4 text-left font-medium">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...securityEvents, 
                      {
                        id: 'evt-006',
                        type: 'System Update',
                        user: 'system',
                        location: 'Security Platform',
                        time: '12:00 AM',
                        date: 'Yesterday',
                        severity: 'low',
                      },
                      {
                        id: 'evt-007',
                        type: 'Camera Offline',
                        user: 'N/A',
                        location: 'East Wing, Camera #12',
                        time: '11:42 PM',
                        date: 'Yesterday',
                        severity: 'medium',
                      },
                    ].map((event, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-4">{event.date}, {event.time}</td>
                        <td className="py-3 px-4">{event.type}</td>
                        <td className="py-3 px-4">{event.user}</td>
                        <td className="py-3 px-4">{event.location}</td>
                        <td className="py-3 px-4">
                          <Button variant="link" size="sm" className="p-0 h-auto">View Details</Button>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.severity === 'high'
                              ? 'bg-red-100 text-red-800'
                              : event.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
