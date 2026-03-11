
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Users, ShoppingCart, Eye, TrendingUp, TrendingDown } from 'lucide-react';

const generateSparklineData = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, () => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const STATS = [
  {
    title: 'Total Revenue',
    value: '$48,295',
    trend: '+12.5%',
    isPositive: true,
    icon: DollarSign,
    color: '#f4722b', // brand orange
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    data: generateSparklineData(15, 10, 30),
  },
  {
    title: 'Active Users',
    value: '2,847',
    trend: '+8.2%',
    isPositive: true,
    icon: Users,
    color: '#10b981', // emerald
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    data: generateSparklineData(15, 20, 40),
  },
  {
    title: 'Total Orders',
    value: '1,432',
    trend: '-3.1%',
    isPositive: false,
    icon: ShoppingCart,
    color: '#64748b', // slate
    bgColor: 'bg-slate-100',
    iconColor: 'text-slate-500',
    data: generateSparklineData(15, 30, 20).reverse(),
  },
  {
    title: 'Page Views',
    value: '284K',
    trend: '+24.7%',
    isPositive: true,
    icon: Eye,
    color: '#f59e0b', // amber
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-500',
    data: generateSparklineData(15, 10, 50),
  },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {STATS.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4 text-sm">
            <div className={`flex items-center gap-1 font-semibold ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stat.trend}
            </div>
            <span className="text-slate-400">vs last month</span>
          </div>

          <div className="h-12 -mx-6 -mb-6 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stat.data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={stat.color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Subtle gradient overlay at the bottom matching the line color */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-12 opacity-10 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${stat.color} 100%)`
            }}
          />
        </div>
      ))}
    </div>
  );
};
