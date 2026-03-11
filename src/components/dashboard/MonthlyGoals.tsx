
import { Progress } from 'antd';

const goals = [
  {
    title: 'Monthly Revenue',
    value: '48,295',
    target: '55,000',
    percentage: 88,
    color: '#f4722b', // brand orange
  },
  {
    title: 'New Customers',
    value: '847',
    target: '1,000',
    percentage: 85,
    color: '#0f766e', // teal
  },
  {
    title: 'Conversion Rate',
    value: '3.8%',
    target: '5.0%',
    percentage: 76,
    color: '#1e293b', // dark slate
  },
];

export const MonthlyGoals = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 leading-tight">Monthly Goals</h2>
        <p className="text-sm text-slate-500">Track progress toward targets</p>
      </div>

      <div className="flex-1 space-y-6">
        {goals.map((goal) => (
          <div key={goal.title}>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-900">{goal.title}</span>
              <span className="text-slate-500">{goal.percentage}%</span>
            </div>
            
            <Progress 
              percent={goal.percentage} 
              showInfo={false} 
              strokeColor={goal.color}
              trailColor="#f1f5f9"
              size={['100%', 8]} // Customize width and height
              style={{ marginBottom: '8px' }}
            />
            
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>{goal.value}</span>
              <span>Target: {goal.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
