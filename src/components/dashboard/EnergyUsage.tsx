
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: '00:00', value: 265 },
  { name: '03:00', value: 204 },
  { name: '06:00', value: 182 },
  { name: '09:00', value: 351 },
  { name: '12:00', value: 426 },
  { name: '15:00', value: 412 },
  { name: '18:00', value: 320 },
  { name: '21:00', value: 278 },
];

export function EnergyUsage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Energy Consumption</CardTitle>
          <CardDescription>Today's usage in kWh</CardDescription>
        </div>
        <Gauge className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value} kW`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                fill="#E5DEFF"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-sm text-muted-foreground">Total Today</div>
            <div className="text-2xl font-bold">2,438 kWh</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-sm text-muted-foreground">Peak Usage</div>
            <div className="text-2xl font-bold">426 kW <span className="text-sm font-normal">(12:00)</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
