
import { StatCards } from '../components/dashboard/StatCards';
import { OverviewChart } from '../components/dashboard/OverviewChart';
import { TrafficSources } from '../components/dashboard/TrafficSources';
import { MonthlyGoals } from '../components/dashboard/MonthlyGoals';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header section */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-500">Welcome back, Aigars. Here's what's happening with your business today.</p>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left column - Overview Chart (2/3 on xl screens, full width on smaller) */}
        <div className="xl:col-span-2">
          <OverviewChart />
        </div>

        {/* Right column - Traffic Sources & Monthly Goals */}
        <div className="flex flex-col gap-6">
          <TrafficSources />
          <MonthlyGoals />
        </div>
      </div>

      {/* Recent Orders and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>

        {/* Recent Activity - Takes 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

