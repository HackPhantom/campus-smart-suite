
import { PageLayout } from '@/components/layout/PageLayout';
import { StatisticsOverview } from '@/components/dashboard/StatisticsOverview';
import { UpcomingBookings } from '@/components/dashboard/UpcomingBookings';
import { EnergyUsage } from '@/components/dashboard/EnergyUsage';
import { CampusAlerts } from '@/components/dashboard/CampusAlerts';
import { CampusOverview } from '@/components/dashboard/CampusOverview';

export default function Dashboard() {
  return (
    <PageLayout title="Dashboard">
      <div className="space-y-6">
        <StatisticsOverview />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <UpcomingBookings />
            <CampusAlerts />
          </div>
          <div className="space-y-6">
            <EnergyUsage />
            <CampusOverview />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
