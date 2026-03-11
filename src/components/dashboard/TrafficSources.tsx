
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Direct', value: 35, color: '#f4722b' }, // orange
  { name: 'Organic', value: 28, color: '#0f766e' }, // teal
  { name: 'Referral', value: 22, color: '#1e293b' }, // dark slate
  { name: 'Social', value: 15, color: '#f59e0b' }, // amber
];

export const TrafficSources = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[320px] flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 leading-tight">Traffic Sources</h2>
        <p className="text-sm text-slate-500">Where your visitors come from</p>
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="w-[140px] h-[140px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value ? [`${value}%`, 'Traffic'] : ''} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-slate-900">284K</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Visits</span>
          </div>
        </div>

        <div className="flex-1 pl-6">
          <ul className="space-y-3">
            {data.map((item) => (
              <li key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
