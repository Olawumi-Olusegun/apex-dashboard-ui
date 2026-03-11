import { useState } from 'react';
import { Card, List, Tag, Button, Space, Input, Select, Badge, Empty } from 'antd';
import { 
  CheckOutlined, 
  DeleteOutlined, 
  EditOutlined,
  SearchOutlined,
  FilterOutlined,
  ClearOutlined
} from '@ant-design/icons';
import { Bell, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'order' | 'system' | 'payment' | 'security' | 'general';
  priority: 'low' | 'medium' | 'high';
}

const generateNotifications = (): Notification[] => {
  const notifications = [
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #12345 has been placed by John Doe for $249.99',
      time: '2 minutes ago',
      date: '2026-03-11',
      read: false,
      type: 'success' as const,
      category: 'order' as const,
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Product "Wireless Headphones" is running low (5 items remaining)',
      time: '15 minutes ago',
      date: '2026-03-11',
      read: false,
      type: 'warning' as const,
      category: 'system' as const,
      priority: 'medium' as const
    },
    {
      id: '3',
      title: 'Payment Received',
      message: 'Payment of $249.99 has been confirmed for invoice INV-0023',
      time: '1 hour ago',
      date: '2026-03-11',
      read: true,
      type: 'success' as const,
      category: 'payment' as const,
      priority: 'medium' as const
    },
    {
      id: '4',
      title: 'System Update',
      message: 'Dashboard updated to version 2.1.0 with new features and improvements',
      time: '3 hours ago',
      date: '2026-03-11',
      read: true,
      type: 'info' as const,
      category: 'system' as const,
      priority: 'low' as const
    },
    {
      id: '5',
      title: 'Failed Login Attempt',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100',
      time: '5 hours ago',
      date: '2026-03-11',
      read: false,
      type: 'error' as const,
      category: 'security' as const,
      priority: 'high' as const
    },
    {
      id: '6',
      title: 'Order Shipped',
      message: 'Order #12340 has been shipped and is on its way to the customer',
      time: '6 hours ago',
      date: '2026-03-11',
      read: true,
      type: 'info' as const,
      category: 'order' as const,
      priority: 'low' as const
    },
    {
      id: '7',
      title: 'Monthly Report Ready',
      message: 'Your monthly analytics report for February 2026 is now available',
      time: '1 day ago',
      date: '2026-03-10',
      read: false,
      type: 'info' as const,
      category: 'general' as const,
      priority: 'low' as const
    },
    {
      id: '8',
      title: 'Payment Failed',
      message: 'Payment processing failed for order #12338. Customer notified.',
      time: '1 day ago',
      date: '2026-03-10',
      read: true,
      type: 'error' as const,
      category: 'payment' as const,
      priority: 'high' as const
    },
    {
      id: '9',
      title: 'New Customer Registration',
      message: 'Welcome new customer: Sarah Johnson (sarah@example.com)',
      time: '2 days ago',
      date: '2026-03-09',
      read: true,
      type: 'success' as const,
      category: 'general' as const,
      priority: 'low' as const
    },
    {
      id: '10',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2 AM to 4 AM EST',
      time: '2 days ago',
      date: '2026-03-09',
      read: false,
      type: 'warning' as const,
      category: 'system' as const,
      priority: 'medium' as const
    }
  ];
  
  return notifications;
};

export const NotificationPage = () => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>(generateNotifications());
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(allNotifications);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const markAsRead = (id: string) => {
    const updated = allNotifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setAllNotifications(updated);
    applyFilters(updated, searchText, statusFilter, typeFilter, categoryFilter);
  };

  const markAsUnread = (id: string) => {
    const updated = allNotifications.map(notif => 
      notif.id === id ? { ...notif, read: false } : notif
    );
    setAllNotifications(updated);
    applyFilters(updated, searchText, statusFilter, typeFilter, categoryFilter);
  };

  const deleteNotification = (id: string) => {
    const updated = allNotifications.filter(notif => notif.id !== id);
    setAllNotifications(updated);
    applyFilters(updated, searchText, statusFilter, typeFilter, categoryFilter);
  };

  const markAllAsRead = () => {
    const updated = allNotifications.map(notif => ({ ...notif, read: true }));
    setAllNotifications(updated);
    applyFilters(updated, searchText, statusFilter, typeFilter, categoryFilter);
  };

  const clearAll = () => {
    setAllNotifications([]);
    setFilteredNotifications([]);
  };

  const applyFilters = (
    notifications: Notification[], 
    search: string, 
    status: 'all' | 'unread' | 'read', 
    type: string, 
    category: string
  ) => {
    let filtered = notifications;

    if (search) {
      filtered = filtered.filter(notif => 
        notif.title.toLowerCase().includes(search.toLowerCase()) ||
        notif.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(notif => 
        status === 'read' ? notif.read : !notif.read
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter(notif => notif.type === type);
    }

    if (category !== 'all') {
      filtered = filtered.filter(notif => notif.category === category);
    }

    setFilteredNotifications(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(allNotifications, value, statusFilter, typeFilter, categoryFilter);
  };

  const handleStatusFilter = (value: 'all' | 'unread' | 'read') => {
    setStatusFilter(value);
    applyFilters(allNotifications, searchText, value, typeFilter, categoryFilter);
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    applyFilters(allNotifications, searchText, statusFilter, value, categoryFilter);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    applyFilters(allNotifications, searchText, statusFilter, typeFilter, value);
  };

  const clearFilters = () => {
    setSearchText('');
    setStatusFilter('all');
    setTypeFilter('all');
    setCategoryFilter('all');
    setFilteredNotifications(allNotifications);
  };

  const unreadCount = allNotifications.filter(notif => !notif.read).length;
  const totalCount = allNotifications.length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Bell className="w-7 h-7" />
            Notifications
            {unreadCount > 0 && (
              <Badge count={unreadCount} className="ml-2" />
            )}
          </h1>
          <p className="text-slate-500 mt-1">
            Manage and track all your notifications ({totalCount} total, {unreadCount} unread)
          </p>
        </div>
        <Space>
          <Button 
            icon={<CheckOutlined />} 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
          <Button 
            icon={<ClearOutlined />} 
            danger 
            onClick={clearAll}
            disabled={totalCount === 0}
          >
            Clear All
          </Button>
        </Space>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <Input
              placeholder="Search notifications..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </div>
          <div>
            <Select
              placeholder="Filter by status"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="unread">Unread</Select.Option>
              <Select.Option value="read">Read</Select.Option>
            </Select>
          </div>
          <div>
            <Select
              placeholder="Filter by type"
              style={{ width: '100%' }}
              value={typeFilter}
              onChange={handleTypeFilter}
            >
              <Select.Option value="all">All Types</Select.Option>
              <Select.Option value="info">Info</Select.Option>
              <Select.Option value="success">Success</Select.Option>
              <Select.Option value="warning">Warning</Select.Option>
              <Select.Option value="error">Error</Select.Option>
            </Select>
          </div>
          <div>
            <Select
              placeholder="Filter by category"
              style={{ width: '100%' }}
              value={categoryFilter}
              onChange={handleCategoryFilter}
            >
              <Select.Option value="all">All Categories</Select.Option>
              <Select.Option value="order">Orders</Select.Option>
              <Select.Option value="system">System</Select.Option>
              <Select.Option value="payment">Payments</Select.Option>
              <Select.Option value="security">Security</Select.Option>
              <Select.Option value="general">General</Select.Option>
            </Select>
          </div>
          <div>
            <Button 
              icon={<FilterOutlined />} 
              onClick={clearFilters}
              style={{ width: '100%' }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <Card>
        {filteredNotifications.length === 0 ? (
          <Empty
            image={<Bell className="w-16 h-16 mx-auto text-slate-300" />}
            description={
              <span className="text-slate-500">
                {allNotifications.length === 0 ? 'No notifications yet' : 'No notifications match your filters'}
              </span>
            }
          />
        ) : (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notifications`
            }}
            dataSource={filteredNotifications}
            renderItem={(notification) => (
              <List.Item
                key={notification.id}
                className={`border rounded-lg p-4 mb-3 transition-all hover:shadow-md ${
                  notification.read ? 'bg-slate-50' : 'bg-blue-50 border-blue-200'
                }`}
                actions={[
                  <Space key="actions">
                    {!notification.read ? (
                      <Button
                        type="text"
                        size="small"
                        icon={<CheckOutlined />}
                        onClick={() => markAsRead(notification.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Mark Read
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => markAsUnread(notification.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Mark Unread
                      </Button>
                    )}
                    <Button
                      type="text"
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-800"
                      danger
                    >
                      Delete
                    </Button>
                  </Space>
                ]}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg border ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`font-semibold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                        
                        <p className={`text-sm mb-3 ${notification.read ? 'text-slate-500' : 'text-slate-700'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400">{notification.time}</span>
                          <Tag color={getPriorityColor(notification.priority)} className="text-xs">
                            {notification.priority.toUpperCase()}
                          </Tag>
                          <Tag className="text-xs capitalize">
                            {notification.category}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};