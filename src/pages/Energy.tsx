
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Battery, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';
import { StatusBadge } from '@/components/ui/status-badge';

const dailyData = [
  { time: '00:00', consumption: 324 },
  { time: '02:00', consumption: 280 },
  { time: '04:00', consumption: 258 },
  { time: '06:00', consumption: 320 },
  { time: '08:00', consumption: 490 },
  { time: '10:00', consumption: 560 },
  { time: '12:00', consumption: 610 },
  { time: '14:00', consumption: 580 },
  { time: '16:00', consumption: 520 },
  { time: '18:00', consumption: 480 },
  { time: '20:00', consumption: 420 },
  { time: '22:00', consumption: 370 },
];

const weeklyData = [
  { day: 'Mon', consumption: 4200 },
  { day: 'Tue', consumption: 4500 },
  { day: 'Wed', consumption: 4800 },
  { day: 'Thu', consumption: 5100 },
  { day: 'Fri', consumption: 4900 },
  { day: 'Sat', consumption: 3200 },
  { day: 'Sun', consumption: 2800 },
];

const distributionData = [
  { name: 'HVAC', value: 42 },
  { name: 'Lighting', value: 25 },
  { name: 'Computing', value: 18 },
  { name: 'Other', value: 15 },
];

const buildingData = [
  {
    name: 'Main Building',
    consumption: 12500,
    status: 'online' as const,
    change: '+3%',
  },
  {
    name: 'Science Wing',
    consumption: 8700,
    status: 'warning' as const,
    change: '+12%',
  },
  {
    name: 'Library',
    consumption: 5400,
    status: 'online' as const,
    change: '-5%',
  },
  {
    name: 'Student Center',
    consumption: 7200,
    status: 'online' as const,
    change: '+1%',
  },
];

const COLORS = ['#8B5CF6', '#6E59A5', '#E5DEFF', '#1A1F2C'];

export default function Energy() {
  return (
    <PageLayout title="Energy Monitoring">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">29,458 kWh</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">↓ 8% </span>
                compared to yesterday
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">728,245 kWh</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-red-600 font-medium">↑ 3% </span>
                compared to last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Peak Demand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">842 kW</div>
              <div className="text-xs text-muted-foreground mt-1">
                Today at 12:15 PM
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Daily Consumption</CardTitle>
                  <CardDescription>Today's energy usage over time</CardDescription>
                </div>
                <Gauge className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" />
                    <YAxis tickFormatter={(value) => `${value} kW`} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="consumption"
                      name="Power Consumption"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Weekly Consumption</CardTitle>
                  <CardDescription>This week's energy usage by day</CardDescription>
                </div>
                <Battery className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `${value} kWh`} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumption" name="Energy Consumption" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Distribution</CardTitle>
              <CardDescription>Consumption by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Building Consumption</CardTitle>
                  <CardDescription>Energy usage by building</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buildingData.map((building, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{building.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {building.consumption.toLocaleString()} kWh
                        <span className={`ml-2 ${building.change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                          {building.change}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {building.status === 'warning' && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <StatusBadge status={building.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
