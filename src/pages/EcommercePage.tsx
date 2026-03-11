import { Card, Row, Col, Statistic, Button, Table, Tag, Progress } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, UserOutlined, RiseOutlined } from '@ant-design/icons';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000, orders: 240, revenue: 24000 },
  { name: 'Feb', sales: 3000, orders: 198, revenue: 22100 },
  { name: 'Mar', sales: 5000, orders: 300, revenue: 32000 },
  { name: 'Apr', sales: 4780, orders: 278, revenue: 28901 },
  { name: 'May', sales: 5890, orders: 345, revenue: 35400 },
  { name: 'Jun', sales: 4390, orders: 267, revenue: 29800 },
];

const topProducts = [
  { id: 1, name: 'Pro Dashboard License', sales: 156, revenue: 46680, growth: 12.5 },
  { id: 2, name: 'Team Plan Upgrade', sales: 89, revenue: 53311, growth: 8.2 },
  { id: 3, name: 'Enterprise License', sales: 34, revenue: 50966, growth: -2.1 },
  { id: 4, name: 'Single License', sales: 234, revenue: 18486, growth: 15.7 },
];

export const EcommercePage = () => {

  const productColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div className="font-medium text-slate-900">{name}</div>
      ),
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => sales.toLocaleString(),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue: number) => `$${revenue.toLocaleString()}`,
    },
    {
      title: 'Growth',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth: number) => (
        <Tag color={growth > 0 ? 'green' : 'red'}>
          {growth > 0 ? '+' : ''}{growth}%
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">eCommerce</h1>
            <p className="text-slate-500">Monitor your online store performance and sales</p>
          </div>
          
          <div className="flex gap-4">
            <Button type="default">Export Data</Button>
            <Button type="primary" className="bg-slate-900 hover:bg-slate-800 border-slate-900">
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Total Sales"
                value={26871}
                prefix={<ShoppingCartOutlined className="text-blue-500" />}
                suffix="orders"
                valueStyle={{ color: '#1890ff' }}
              />
              <div className="mt-2 text-xs text-green-500">+12.5% vs last month</div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Revenue"
                value={845290}
                prefix={<DollarOutlined className="text-green-500" />}
                precision={0}
                valueStyle={{ color: '#52c41a' }}
              />
              <div className="mt-2 text-xs text-green-500">+8.2% vs last month</div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Active Customers"
                value={12847}
                prefix={<UserOutlined className="text-purple-500" />}
                valueStyle={{ color: '#722ed1' }}
              />
              <div className="mt-2 text-xs text-green-500">+3.1% vs last month</div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Conversion Rate"
                value={3.85}
                prefix={<RiseOutlined className="text-orange-500" />}
                suffix="%"
                precision={2}
                valueStyle={{ color: '#fa8c16' }}
              />
              <div className="mt-2 text-xs text-red-500">-0.3% vs last month</div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Sales Chart & Top Products */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Sales Performance</h3>
              <p className="text-sm text-slate-500">Monthly sales and revenue trends</p>
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f4722b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f4722b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? `$${Number(value).toLocaleString()}` : Number(value).toLocaleString(),
                    name === 'sales' ? 'Sales' : name === 'orders' ? 'Orders' : 'Revenue'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#f4722b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
              <p className="text-sm text-slate-500">Best performing products this month</p>
            </div>
            
            <Table
              columns={productColumns}
              dataSource={topProducts}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* Order Fulfillment Status */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Order Fulfillment</h3>
              <p className="text-sm text-slate-500">Current order processing status</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Pending Orders</span>
                  <span className="text-sm text-slate-500">23/150</span>
                </div>
                <Progress percent={15} strokeColor="#f59e0b" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Processing</span>
                  <span className="text-sm text-slate-500">67/150</span>
                </div>
                <Progress percent={45} strokeColor="#3b82f6" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Shipped</span>
                  <span className="text-sm text-slate-500">45/150</span>
                </div>
                <Progress percent={30} strokeColor="#10b981" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Delivered</span>
                  <span className="text-sm text-slate-500">15/150</span>
                </div>
                <Progress percent={10} strokeColor="#059669" />
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Inventory Alerts</h3>
              <p className="text-sm text-slate-500">Products requiring attention</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-red-900">Pro Dashboard License</div>
                  <div className="text-sm text-red-600">Only 5 units left</div>
                </div>
                <Tag color="red">Low Stock</Tag>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-yellow-900">Custom Integration</div>
                  <div className="text-sm text-yellow-600">15 units remaining</div>
                </div>
                <Tag color="orange">Medium Stock</Tag>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-red-900">API Access Plan</div>
                  <div className="text-sm text-red-600">Out of stock</div>
                </div>
                <Tag color="red">No Stock</Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <div className="mb-8">
        <RecentOrders showActions={true} pageSize={8} />
      </div>
    </div>
  );
};