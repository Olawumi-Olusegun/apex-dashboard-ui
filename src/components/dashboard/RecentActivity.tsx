import { ShoppingCart, User, Star, DollarSign, Headphones  } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'order' | 'user' | 'review' | 'payment' | 'support';
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'order',
    title: 'New order placed',
    description: 'Emma Wilson purchased Pro Dashboard License',
    time: '2 min ago',
    icon: ShoppingCart,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    id: '2',
    type: 'user',
    title: 'New customer registered',
    description: 'James Chen created an account',
    time: '15 min ago',
    icon: User,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
  },
  {
    id: '3',
    type: 'review',
    title: '5-star review received',
    description: '"Amazing template, exactly what I needed!"',
    time: '1 hour ago',
    icon: Star,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment received',
    description: '$1,499 from Sofia Garcia',
    time: '2 hours ago',
    icon: DollarSign,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  {
    id: '5',
    type: 'support',
    title: 'Support ticket resolved',
    description: 'Ticket #4521 marked as resolved',
    time: '3 hours ago',
    icon: Headphones,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
  },
  {
    id: '6',
    type: 'order',
    title: 'New order placed',
    description: 'Alex Thompson purchased Single License',
    time: '5 hours ago',
    icon: ShoppingCart,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Recent Activity</h2>
          <p className="text-sm text-slate-500">Latest events from your store</p>
        </div>
        <button className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-3 group">
            {/* Icon */}
            <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-tight mt-0.5">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-medium ml-2 shrink-0">
                  {activity.time}
                </span>
              </div>

              {/* Timeline line */}
              {index < activities.length - 1 && (
                <div className="w-px h-4 bg-slate-200 ml-4 mt-3" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};