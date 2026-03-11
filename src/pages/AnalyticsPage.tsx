import { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { StatCards } from '../components/dashboard/StatCards';
import { OverviewChart } from '../components/dashboard/OverviewChart';
import { TrafficSources } from '../components/dashboard/TrafficSources';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const { RangePicker } = DatePicker;
const { Option } = Select;

const conversionData = [
  { name: 'Visitors', value: 10000, conversion: 100 },
  { name: 'Leads', value: 2500, conversion: 25 },
  { name: 'Opportunities', value: 800, conversion: 8 },
  { name: 'Customers', value: 150, conversion: 1.5 },
];

const deviceData = [
  { name: 'Desktop', value: 65, color: '#f4722b' },
  { name: 'Mobile', value: 30, color: '#0f766e' },
  { name: 'Tablet', value: 5, color: '#1e293b' },
];

const pageViewsData = [
  { name: 'Mon', views: 1200, users: 800 },
  { name: 'Tue', views: 1500, users: 950 },
  { name: 'Wed', views: 1800, users: 1100 },
  { name: 'Thu', views: 1400, users: 900 },
  { name: 'Fri', views: 2200, users: 1300 },
  { name: 'Sat', views: 1800, users: 1000 },
  { name: 'Sun', views: 1600, users: 850 },
];

export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
            <p className="text-slate-500">Detailed insights into your business performance</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              <Select
                value={timeRange}
                onChange={setTimeRange}
                className="w-32"
              >
                <Option value="1d">Today</Option>
                <Option value="7d">Last 7 days</Option>
                <Option value="30d">Last 30 days</Option>
                <Option value="90d">Last 90 days</Option>
              </Select>
              
              <RangePicker className="hidden sm:block" />
            </div>
            
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="bg-slate-900 hover:bg-slate-800 border-slate-900"
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <StatCards />
      </div>

      {/* Main Charts */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <OverviewChart />
        </Col>
        
        <Col xs={24} lg={8}>
          <div className="space-y-6">
            <TrafficSources />
            
            {/* Device Analytics */}
            <Card className="h-80">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">Device Analytics</h3>
                <p className="text-sm text-slate-500">User device breakdown</p>
              </div>
              
              <div className="flex items-center justify-center h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Additional Analytics */}
      <Row gutter={[24, 24]}>
        {/* Conversion Funnel */}
        <Col xs={24} lg={12}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Conversion Funnel</h3>
              <p className="text-sm text-slate-500">Customer journey conversion rates</p>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                <Bar dataKey="conversion" fill="#f4722b" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Page Views & Users */}
        <Col xs={24} lg={12}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Page Views & Users</h3>
              <p className="text-sm text-slate-500">Daily website activity</p>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#f4722b" strokeWidth={3} />
                <Line type="monotone" dataKey="users" stroke="#0f766e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};