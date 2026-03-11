import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDashboardStore } from '../../stores/dashboardStore';

const data = [
  { name: 'Jan', revenue: 18000, orders: 180, profit: 8000 },
  { name: 'Feb', revenue: 22000, orders: 220, profit: 9500 },
  { name: 'Mar', revenue: 20000, orders: 200, profit: 8500 },
  { name: 'Apr', revenue: 28000, orders: 280, profit: 12000 },
  { name: 'May', revenue: 32000, orders: 320, profit: 14500 },
  { name: 'Jun', revenue: 29000, orders: 290, profit: 13000 },
  { name: 'Jul', revenue: 35000, orders: 350, profit: 16000 },
  { name: 'Aug', revenue: 38000, orders: 380, profit: 17500 },
  { name: 'Sep', revenue: 42000, orders: 420, profit: 19000 },
  { name: 'Oct', revenue: 41000, orders: 410, profit: 18500 },
  { name: 'Nov', revenue: 48000, orders: 480, profit: 21000 },
  { name: 'Dec', revenue: 52000, orders: 520, profit: 23500 },
];

export const OverviewChart = () => {
  const { activeChartTab, setActiveChartTab } = useDashboardStore();

  const getDataKey = () => {
    switch (activeChartTab) {
      case 'Orders':
        return 'orders';
      case 'Profit':
        return 'profit';
      default:
        return 'revenue';
    }
  };

  const formatValue = (value: number) => {
    switch (activeChartTab) {
      case 'Orders':
        return value.toLocaleString();
      case 'Profit':
      case 'Revenue':
      default:
        return `$${value.toLocaleString()}`;
    }
  };

  const formatTickValue = (value: number) => {
    switch (activeChartTab) {
      case 'Orders':
        return value / 100 + 'k';
      case 'Profit':
      case 'Revenue':
      default:
        return `$${value / 1000}k`;
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[350px] sm:min-h-[400px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Overview</h2>
          <p className="text-sm text-slate-500">Monthly performance for the current year</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveChartTab('Revenue')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-lg transition-colors ${activeChartTab === 'Revenue' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            Revenue
          </button>
          <button 
            onClick={() => setActiveChartTab('Orders')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-lg transition-colors ${activeChartTab === 'Orders' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            Orders
          </button>
          <button 
            onClick={() => setActiveChartTab('Profit')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-lg transition-colors ${activeChartTab === 'Profit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            Profit
          </button>
        </div>
      </div>

      <div className="flex-1 w-full h-full min-h-[250px] sm:min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f4722b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f4722b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={formatTickValue}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#f4722b', fontWeight: 'bold' }}
              formatter={(value) => value ? [formatValue(value as number), activeChartTab] : ''}
            />
            <Area
              type="monotone"
              dataKey={getDataKey()}
              stroke="#f4722b"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorData)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
