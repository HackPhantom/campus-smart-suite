
import { CalendarClock, FileCheck, Gauge, Users } from 'lucide-react';
import { MetricCard } from '@/components/ui/metric-card';

export function StatisticsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Bookings"
        value="128"
        description="This month"
        trend={{ value: 12, isPositive: true }}
        icon={<CalendarClock className="h-5 w-5" />}
      />
      <MetricCard
        title="Attendance Rate"
        value="87%"
        description="Last 7 days"
        trend={{ value: 3, isPositive: true }}
        icon={<FileCheck className="h-5 w-5" />}
      />
      <MetricCard
        title="Energy Consumption"
        value="458 kWh"
        description="This week"
        trend={{ value: 8, isPositive: false }}
        icon={<Gauge className="h-5 w-5" />}
      />
      <MetricCard
        title="Active Users"
        value="2,458"
        description="This month"
        trend={{ value: 5, isPositive: true }}
        icon={<Users className="h-5 w-5" />}
      />
    </div>
  );
}
